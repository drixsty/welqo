import { fetchApi, setToken, clearToken, getToken } from "./api";

export interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  owner: Owner;
}

export async function login(email: string, password: string): Promise<Owner> {
  const data = await fetchApi<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setToken(data.accessToken);
  if (typeof window !== "undefined") {
    localStorage.setItem("welqo_owner", JSON.stringify(data.owner));
  }
  return data.owner;
}

export function logout(): void {
  clearToken();
}

export function getStoredOwner(): Owner | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("welqo_owner");
    return raw ? (JSON.parse(raw) as Owner) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
export function getStoredToken(): string | null {
  return getToken();
}
