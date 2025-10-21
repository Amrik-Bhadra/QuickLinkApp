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

// For registration and login requests
export interface AuthRequestPayload {
  email?: string;
  password?: string;
}

// For the response from a successful registration or login
export interface AuthResponse {
  token: string;
}

// Create an Axios instance with the base URL of our backend
export const apiClient = axios.create({
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

// register end point function
export const registerUser = async (payload: AuthRequestPayload): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data || 'Registration failed.');
    }
    throw new Error('Registration failed.');
  }
};

// login end point function
export const loginUser = async (payload: AuthRequestPayload): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data || 'Login failed. Please check your credentials.');
    }
    throw new Error('Login failed.');
  }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await apiClient.post('/auth/logout');
    } catch (error) {
        // We don't need to throw an error here, just log it.
        // The frontend will clear the token regardless.
        console.error("Logout failed on the server, but logging out locally.", error);
    }
};

export const getUserLinks = async (): Promise<LinkHistoryItem[]> => {
    try {
        const response = await apiClient.get<LinkHistoryItem[]>('/url/my-links');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data || 'Failed to fetch your links.');
        }
        throw new Error('Failed to fetch your links.');
    }
};