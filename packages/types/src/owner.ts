// Owner bounded context

export type OwnerRole =
  | "OWNER"
  | "ADMIN"
  | "OPS_MANAGER"
  | "CLEANING"
  | "MAINTENANCE";

export interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: OwnerRole;
  isActive: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthenticatedOwner {
  owner: Owner;
  tokens: AuthTokens;
}
