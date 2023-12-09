import { User, Reservation,Listing } from "@prisma/client";

// type for a safe version of Listing
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string; 
};

// type for a safe version of Reservation
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  startDate: string; 
  createdAt: string; 
  listing: SafeListing; // Embed the SafeListing type for the 'listing' field
  endDate: string; 
};

// type for a safe version of User
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  updatedAt: string; 
  createdAt: string; 
  emailVerified: string | null; 
};
