import type { Review } from "@/types/review";
import {getDb} from "@/lib/mongo";

// returns an array of review objects
export async function getReviewsByBookId(bookId: number): Promise<Review[]> {

    const db = await getDb();

    const collection = db.collection("reviews"); // grabs reviews collection

    const docs = await collection
        .find({ bookId })           // find all matches for the id
        .sort({ createdAt: 1 })     // oldest first is displayed
        .toArray();

    // converts to review shape from the review.ts interface
    return docs.map((doc: any) => ({
        id: doc._id.toString(),
        bookId: doc.bookId,
        reviewTitle: doc.name,
        rating: doc.rating,
        text: doc.text,
        createdAt: doc.createdAt.toISOString(),
    }));
}