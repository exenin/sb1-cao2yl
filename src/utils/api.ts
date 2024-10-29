import { useConfig } from '../contexts/ConfigContext';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export function useApi() {
  const { apiEndpoint } = useConfig();

  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetchWithRetry(`${apiEndpoint}${path}`);
      return response.json();
    },

    async post<T>(path: string, data: any): Promise<T> {
      const response = await fetchWithRetry(`${apiEndpoint}${path}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response.json();
    },

    async put<T>(path: string, data: any): Promise<T> {
      const response = await fetchWithRetry(`${apiEndpoint}${path}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return response.json();
    },

    async delete(path: string): Promise<void> {
      await fetchWithRetry(`${apiEndpoint}${path}`, {
        method: 'DELETE'
      });
    }
  };
}