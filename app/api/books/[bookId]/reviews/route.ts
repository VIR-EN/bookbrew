import { NextResponse } from "next/server";
import { getReviewsByBookId } from "@/lib/getReviews";

export async function GET(
    // incoming HTTP request, we don't use it just skip it to get to the second argument
    _req: Request,
    {params}: {params: Promise<{bookId: string}> } // parameter that resolve to the bookId string
) {
    try {
        const {bookId} = await params;

        if (!bookId) {
            return NextResponse.json(
                {error: "Missing bookId param"},
                {status: 400}
            );
        }

        // no converts to a number and makes sure its valid
        const reviews = await getReviewsByBookId(bookId);

        return NextResponse.json({reviews});
    } catch (err: any) {
        console.error("GET /api/books/[bookId]/reviews error:", err);
        return NextResponse.json(
            {error: err.message || "error"},
            {status: 500}
        );
    }
}