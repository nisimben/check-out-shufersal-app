// src/app/models/checkout.models.ts

export interface Address {
    id?: string | null; // Nullable
    addressLine1?: string | null; // Nullable
    addressLine2?: string | null; // Nullable
    city?: string | null; // Nullable
    state?: string | null; // Nullable
    zipCode?: string | null; // Nullable
    country?: string | null; // Nullable
    saved?: boolean; // Nullable but defaults to `false` if not provided
  }
  