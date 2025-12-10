// Elias Pamfilis
import { NextResponse } from "next/server";
import { getReviewsByBookId } from "@/lib/getReviews";

export async function GET(
    // incoming HTTP request, we don't use it just skip it to get to the second argument
    _req: Request,
    // takes second argument by deconstructing params, which is a promise that will bring you bookId
    {params}: {params: Promise<{bookId: string}> } // parameter that resolve to the bookId string dynamically (bookId)
) {

    // waits for route params to arrive and gets bookId from it
    try {
        const {bookId} = await params; // pulls out the bookId only from params that we just got

        if (!bookId) {
            return NextResponse.json(
                {error: "Missing bookId param"},
                {status: 400}
            );
        }

        // sets reviews to bookId passed through the getreviews function to see if there are any reviews
        const reviews = await getReviewsByBookId(bookId);

        // sends the json response
        return NextResponse.json({reviews});
    } catch (err) {
        const message = err instanceof Error ? err.message : "Server error"; // shows message if available
        return NextResponse.json({ error: message }, { status: 500 });
    }
}