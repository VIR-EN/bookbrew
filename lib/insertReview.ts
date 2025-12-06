"use server";
import type {AddReviewResponse} from "@/types/review";
import getCollection, {REVIEW_COLLECTION} from "@/lib/db";

export default async function insertReview(
    bookId: string,
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
    const reviewCollection = await getCollection(REVIEW_COLLECTION);
    const res =
        await reviewCollection.insertOne(new_review);
    let success = false;

    if (!res.acknowledged) {
        throw new Error("FAILED TO ADD NEW REVIEW");
    } else success = true;

    console.log("Successfully added review!");

    return ({bookId, success:success});
}