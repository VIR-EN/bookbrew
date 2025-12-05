"use server";
import type {AddReviewResponse} from "@/types/review";
import {getDb, DB_COLLECTION} from "@/lib/mongo";

export default async function insertReview(
    bookId: number,
    reviewTitle: string,
    rating: number | null,
    text: string,
): Promise<AddReviewResponse> {

    console.log("Adding new review...");

    const new_review = {
        bookId: bookId,
        reviewTitle: reviewTitle,
        rating: rating,
        text: text,
        createdAt: new Date(),
    }

    // Insert to db
    const reviewCollection = await getDb();
    const res =
        await reviewCollection.collection(DB_COLLECTION).insertOne(new_review);
    let success = false;

    if (!res.acknowledged) {
        console.log("FAILED TO ADD NEW REVIEW");
    } else success = true;

    return ({bookId, success:success});
}