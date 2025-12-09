import type { Review } from "@/types/review";
import getCollection, {REVIEW_COLLECTION} from "@/lib/db";

// returns an array of review objects
export async function getReviewsByBookId(bookId: string): Promise<Review[]> {
    const collection = await getCollection(REVIEW_COLLECTION); // grabs reviews collection

    const docs = await collection.find({bookId}).toArray();

    // converts to review shape from the review.ts interface
    return docs.map((doc: any) => ({
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