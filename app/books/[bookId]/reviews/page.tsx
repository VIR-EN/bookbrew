"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Review } from "@/types/review";
import Link from "next/link";

export default function BookReviewsPage() {
    const { bookId } = useParams();
    const bookTitle = useSearchParams().get("title") ?? "";
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // call the api route then wait for data and then set that data to data.review or empty
        const load = async () => {
            const res = await fetch(`/api/books/${bookId}/reviews`);
            const data = await res.json();
            setReviews(data.reviews || []);
            setLoading(false);
        };
        void load(); // call the function and void since we dont need the promise (cause load is async)
    }, [bookId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Link href="/" className="text-blue-500 underline text-3xl ml-5 block mt-2">Back</Link>


            <h1 className="font-bold text-2xl text-center mt-2"> Reviews for {bookTitle || `Book #${bookId}`} </h1>

            <div className="w-1/2 mx-auto">
                {reviews.length === 0 && <p>No reviews yet.</p>}

                {reviews.map(r => (
                    <div key={r.id} className="border border-black p-4 pt-3 mt-5">
                        <div className="font-bold text-lg">{r.reviewTitle}</div>
                        <div>Rating: {r.rating}/5</div>
                        <p>{r.text}</p>
                        <div> {new Date(r.createdAt).toLocaleString()} </div>
                    </div>
                ))}
            </div>
        </div>
    );
}