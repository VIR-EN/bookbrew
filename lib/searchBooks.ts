import { SearchBooksResponse, Book } from "@/types/book";

export async function searchBooks(query: string): Promise<Book[]> {
    const apiKey = process.env.BIGBOOK_API_KEY;

    if (!apiKey) {
        throw new Error("Missing BIGBOOK_API_KEY in environment variables");
    }

    const url = new URL("https://api.bigbookapi.com/search-books");
    url.searchParams.set("query", query);
    url.searchParams.set("api-key", apiKey);

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
