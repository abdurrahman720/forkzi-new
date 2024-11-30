export interface SearchResult {
  id?: string;
  name?: string;
  business_name?: string;
  phone?: string;
  website?: string;
  email?: string;
  category?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  googlestars?: string;
  googlecount?: string;
  yelpstars?: string;
  yelpcount?: string;
  fbcount?: string;
  ig_followers?: string;
  ig_follows?: string;
  ig_isbusiness?: string;
  ig_media_count?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface SearchResponse {
  wait_seconds: string;
  searchid: string;
}