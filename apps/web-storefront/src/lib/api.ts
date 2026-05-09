const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as any;
    throw new Error(error.message || "An error occurred");
  }

  return response.json();
}
