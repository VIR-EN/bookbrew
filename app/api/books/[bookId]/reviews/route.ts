import { NextResponse } from "next/server";
import { getReviewsByBookId } from "@/lib/reviews";

export async function GET(
    // incoming HTTP request, we don't use it just skip it to get to the second argument
    _req: Request,
    { params }: { params: Promise<{ bookId: string }> } // parameter that resolve to the bookId string
) {
    try {
        const { bookId } = await params;

        if (!bookId) {
            return NextResponse.json(
                { error: "Missing bookId param" },
                { status: 400 }
            );
        }

        // no converts to a number and makes sure its valid
        const numericBookId = Number(bookId);

        if (!Number.isFinite(numericBookId)) {
            return NextResponse.json(
                { error: `Invalid bookId: ${bookId}` },
                { status: 400 }
            );
        }

        // return review by asking for all review of that ID and returning as a jason
        const reviews = await getReviewsByBookId(numericBookId);
        return NextResponse.json({ reviews });
    } catch (err: any) {
        console.error("GET /api/books/[bookId]/reviews error:", err);
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
}