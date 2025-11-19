import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Replace with your actual Cloud Foundry backend URL
const BASE_URL = import.meta.env.VITE_API_URL || 'YOUR_CF_URL';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('roleCollection');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// OData helper functions
export interface ODataQuery {
  $filter?: string;
  $select?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $count?: boolean;
}

export function buildODataQuery(query: ODataQuery): string {
  const params = new URLSearchParams();
  
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

export interface ODataResponse<T> {
  value: T[];
  '@odata.count'?: number;
}

export default apiClient;
