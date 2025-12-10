// Elias Pamfilis
import type { Review } from "@/types/review";
import getCollection, {REVIEW_COLLECTION} from "@/lib/db";

// review doc type that we want to return since typescripts needs the type before hand
// (was working with no type but to get rid of any potential issues)
type ReviewDoc = {
    _id: { toString(): string };
    bookId: string;
    reviewTitle: string;
    rating: number;
    text: string;
    userId?: string;
    userName?: string;
    createdAt: Date;
}

// returns an array of review objects
export async function getReviewsByBookId(bookId: string): Promise<Review[]> {
    const collection = await getCollection(REVIEW_COLLECTION); // grabs reviews collection

    // uses find mongo function to find all instances of the bookId that was requested as an array
    const docs = await collection.find<ReviewDoc>({bookId}).toArray();

    // converts to review shape from the review.ts interface
    return docs.map((doc: ReviewDoc) => ({
        id: doc._id.toString(),
        bookId: String(doc.bookId), // just to make sure its a string
        reviewTitle: doc.reviewTitle,
        rating: doc.rating,
        text: doc.text,
        userId: doc.userId || null,
        userName: doc.userName || "Anonymous",
        createdAt: doc.createdAt.toISOString(),
    }));
}