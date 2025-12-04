import { NextResponse } from "next/server";
import { searchBooks } from "@/lib/bigbook";

// This endpoint handles:
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // The ?q= part in the URL
        const q = searchParams.get("q");

        if (!q) {
            return NextResponse.json(
                { error: "Missing ?q= search parameter" },
                { status: 400 }
            );
        }

        const books = await searchBooks(q);

        // Send the books to the frontend
        return NextResponse.json({ books }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
