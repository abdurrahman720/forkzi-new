import { ApiError } from '../services/api/errors';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'AUTH_ERROR':
        return 'Authentication failed. Please check your API key.';
      case 'RATE_LIMIT':
        return 'Rate limit exceeded. Please try again in a few minutes.';
      case 'VALIDATION_ERROR':
        return error.message;
      case 'NETWORK_ERROR':
        return 'Network error. Please check your internet connection.';
      case 'TIMEOUT':
        return 'Request timed out. Please try again.';
      default:
        return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

export function formatAddress(address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}): string {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode
  ].filter(Boolean);
  
  return parts.join(', ');
}