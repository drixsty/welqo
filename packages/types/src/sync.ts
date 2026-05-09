export type SyncStatus = "OK" | "PENDING" | "FAILED" | "STALE";

export interface SyncState {
  propertyId: string;
  status: SyncStatus;
  lastSyncedAt?: string;
  errorMessage?: string;
}

export interface Beds24SyncResult {
  propertyId: string;
  bookingsSynced: number;
  calendarDaysUpdated: number;
  errors: string[];
  syncedAt: string;
}
