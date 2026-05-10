export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1";
const TOKEN_KEY = "welqo_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("welqo_owner");
  }
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      const locale = window.location.pathname.split("/")[1] || "fr";
      window.location.href = `/${locale}/login`;
    }
    throw new Error("Session expirée, veuillez vous reconnecter");
  }

  if (!response.ok) {
    let errorMessage = `Erreur ${response.status}`;
    try {
      const err = await response.json();
      if (err && typeof err === "object") {
        const msg = err.message;
        if (typeof msg === "string") {
          errorMessage = msg;
        } else if (Array.isArray(msg)) {
          errorMessage = msg.join(", ");
        } else if (msg && typeof msg === "object") {
          errorMessage = msg.message || JSON.stringify(msg);
        } else {
          errorMessage = JSON.stringify(err);
        }
      }
    } catch {
      // Fallback if not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
