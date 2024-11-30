const CENSUS_GEOCODER_BASE_URL = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';

export async function geocodeAddress(address: string) {
  const params = new URLSearchParams({
    address,
    benchmark: 'Public_AR_Current',
    format: 'json'
  });

  try {
    const response = await fetch(`${CENSUS_GEOCODER_BASE_URL}?${params}`);
    if (!response.ok) throw new Error('Geocoding failed');

    const data = await response.json();
    const result = data.result?.addressMatches[0];
    
    if (!result) throw new Error('No matching location found');

    return {
      latitude: result.coordinates.y,
      longitude: result.coordinates.x,
      accuracy: result.tigerLine.side
    };
  } catch (error) {
    console.error('Geocoding Error:', error);
    throw error;
  }
}