"use server";

import type { AddReviewResponse } from "@/types/review";
import getCollection, { REVIEW_COLLECTION } from "@/lib/db";
import { auth } from "@/lib/auth"; //  back to working import

export default async function insertReview(
    bookId: string,
    reviewTitle: string,
    rating: number | null,
    text: string
): Promise<AddReviewResponse> {

    //  This is fine — the earlier failure was due to page reload, NOT auth
    const session = await auth();

    if (!session || !session.user || !session.user.email || !session.user.name) {
        throw new Error("You must be signed in to add a review.");
    }

    console.log("Adding new review...");

    const new_review = {
        bookId: bookId,
        reviewTitle: reviewTitle,
        rating: rating,
        text: text,
        userId: session.user.email,
        userName: session.user.name,
        createdAt: new Date(),
    };

    const reviewCollection = await getCollection(REVIEW_COLLECTION);
    const res = await reviewCollection.insertOne(new_review);

    if (!res.acknowledged) {
        throw new Error("FAILED TO ADD NEW REVIEW");
    }

    console.log("Successfully added review!");

    return { bookId, success: true };
}
