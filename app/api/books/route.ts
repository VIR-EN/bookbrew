// by Viren
// Book Search API Route
import { NextResponse } from "next/server";
import { searchBooks } from "@/lib/searchBooks";

// Defines the GET handler for this API route
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // The ?q= part in the URL
        const q = searchParams.get("q");

        // Validates that a search query was provided
        if (!q) {
            return NextResponse.json(
                { error: "Missing ?q= search parameter" },
                { status: 400 }
            );
        }
        // Returns an HTTP 400 (Bad Request) error if the query is missing

        const books = await searchBooks(q);

        // Send the books to the frontend
        // Returns an HTTP 200 (Success) status with the book data
        return NextResponse.json({ books }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
