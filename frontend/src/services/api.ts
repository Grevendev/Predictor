// Om en explicit URL satts i .env används den, annars räknas den ut från Vites bas:
// I Dev:  BASE_URL="/"           => "/api/v1"          (fångas av Vites proxy till port 8000)
// I Prod: BASE_URL="/predictor/" => "/predictor/api/v1" (fångas av Traefik)
const computedBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api/v1`;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || computedBase;

export const api = {
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${cleanEndpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) errorMessage = errorJson.detail;
      } catch {
        // Fallback till standardmeddelande om body inte är JSON
      }
      const error = new Error(errorMessage) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  async post<T>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${cleanEndpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: data !== undefined ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) errorMessage = errorJson.detail;
      } catch {
        // Fallback
      }
      const error = new Error(errorMessage) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  },
};