// By Viren Arora
// Import TypeScript types that define the expected API response structure
// and the Book object used throughout the app
import { SearchBooksResponse, Book } from "@/types/book";

export async function searchBooks(query: string): Promise<Book[]> {
    // Read the BigBook API key securely from environment variables
    const API_KEY = process.env.BIGBOOK_API_KEY;

    // If the API key is missing, immediately stop execution and throw an error
    // This prevents sending broken requests and helps with debugging
    if (!API_KEY) {
        throw new Error("Missing BIGBOOK_API_KEY in environment variables");
    }

    const url = new URL("https://api.bigbookapi.com/search-books");
    url.searchParams.set("query", query);
    url.searchParams.set("api-key", API_KEY);

    const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error(`BigBookAPI returned ${res.status}`);
    }

    const raw: SearchBooksResponse = await res.json();

    // Flatten nested arrays returned by the API
    const books = raw.books.flatMap((group) => group);

    return books;
}
