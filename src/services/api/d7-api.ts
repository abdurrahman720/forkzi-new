import { API_CONFIG } from './config';
import { ApiError } from './errors';
import type { SearchResult } from './types';

export class D7LeadFinderAPI {
  private lastRequestTime: number = 0;
  private readonly minRequestInterval: number = 5000;

  private async throttleRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  async initiateSearch(location: string): Promise<{ searchid: string; wait_seconds: string }> {
    await this.throttleRequest();
    
    const params = new URLSearchParams({
      key: API_CONFIG.apiKey,
      keyword: 'Restaurants',
      country: 'US',
      location
    }).toString();

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.search}?${params}`);
      
      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new ApiError(data.error, 400);
      }

      if (!data.searchid) {
        throw new ApiError('Invalid search response: missing searchid', 500);
      }

      return {
        searchid: String(data.searchid),
        wait_seconds: data.wait_seconds || '15'
      };
    } catch (error) {
      console.error('Search initiation failed:', error);
      throw error instanceof ApiError ? error : new ApiError('Search request failed', 500);
    }
  }

  async getResults(searchId: string): Promise<SearchResult[]> {
    await this.throttleRequest();
    
    const params = new URLSearchParams({
      key: API_CONFIG.apiKey,
      id: searchId
    }).toString();

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.results}?${params}`);
      
      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new ApiError(data.error, 400);
      }

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Results fetch failed:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch results', 500);
    }
  }

  async searchWithPolling(location: string): Promise<SearchResult[]> {
    try {
      // Step 1: Initiate search and get search ID
      const { searchid, wait_seconds } = await this.initiateSearch(location);
      console.log('Search initiated with ID:', searchid);
      
      // Step 2: Wait for the specified time
      const waitTime = parseInt(wait_seconds) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));

      // Step 3: Poll for results
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const results = await this.getResults(searchid);
          if (results.length > 0) {
            return results;
          }
          attempts++;
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        } catch (error) {
          console.error(`Attempt ${attempts + 1} failed:`, error);
          attempts++;
          if (attempts === maxAttempts) throw error;
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
      
      throw new ApiError('No results found after multiple attempts', 404);
    } catch (error) {
      console.error('Search with polling failed:', error);
      throw error instanceof ApiError ? error : new ApiError('Search operation failed', 500);
    }
  }
}

export const d7Api = new D7LeadFinderAPI();