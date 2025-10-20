import axios from 'axios';

// Define the structure of our link history
export interface LinkHistoryItem {
  shortUrl: string;
  longUrl: string;
}

// Define the structure of the API request
export interface ShortenRequestPayload {
  longUrl: string;
  customAlias?: string;
  expiresAt?: string;
}

// Create an Axios instance with the base URL of our backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// The function to call the /url/shorten endpoint
export const shortenUrl = async (payload: ShortenRequestPayload): Promise<string> => {
  try {
    const response = await apiClient.post<string>('/url/shorten', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If the API returns an error message, throw it
      throw new Error(error.response.data || 'An unexpected error occurred.');
    }
    throw new Error('An unexpected error occurred.');
  }
};
