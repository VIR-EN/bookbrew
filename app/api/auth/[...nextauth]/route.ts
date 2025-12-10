// By Viren
// NextAuth API Route Handler Export
import { handlers } from "@/lib/auth";

// Imports the pre-configured authentication request handlers

export const { GET, POST } = handlers;

// Exports the GET and POST HTTP handlers used by NextAuth.