import { PrismaClient } from "@prisma/client";

// global variable to hold the PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
  // var PrismaClient
}

// Initialize PrismaClient and assign it to the global variable if not already defined
const client = globalThis.prisma || new PrismaClient();

// If not in production, set the global prisma variable to the client instance
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
