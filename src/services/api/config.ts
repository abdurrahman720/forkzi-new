export const API_CONFIG = {
  baseUrl: 'https://dash.d7leadfinder.com/app/api',
  apiKey: import.meta.env.VITE_D7_LEAD_FINDER_API_KEY,
  endpoints: {
    search: '/search/',
    results: '/results/',
    account: '/account/',
    history: '/history/',
    keywords: '/keywords/'
  },
  polling: {
    maxAttempts: 3,
    interval: 5000,
    defaultWaitTime: 15000
  }
} as const;