// Elias Pamfils
"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Review } from "@/types/review";


export default function BookReviewsPage() {
    const params = useParams(); // access dynamic segment with useParams
    const bookId = params.bookId as string; // extracts bookId as a string
    const bookTitle = useSearchParams().get("title") ?? ""; // reads the title from the url
    const [reviews, setReviews] = useState<Review[]>([]); // holds the array of review objects
    const [loading, setLoading] = useState(true); // sets the loading and stops when its done

    useEffect(() => {
        // call the api route then wait for data and then set that data to data.review or empty if needed
        const load = async () => {
            const res = await fetch(`/api/books/${bookId}/reviews`);
            const data = await res.json();
            setReviews(data.reviews || []);
            setLoading(false); // loading stops
        };
        void load(); // call the function and void since we dont need the promise (cause load is async)
    }, [bookId]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h1 className="capitalize text-3xl font-semibold text-[#3d2e1f] pl-2 text-center mt-9"> Reviews for {bookTitle || `Book #${bookId}`} </h1>

            <div className="max-w-4xl mx-auto p-6">
                {reviews.length === 0 && <p>No reviews yet.</p>}

                {reviews.map(r => (
                    <div key={r.id} className="border bg-[#EFE9E3] rounded-md p-2 m-4">
                        <div className="font-bold text-2xl">{r.reviewTitle}</div>
                        <div className="text-sm font-medium text-xl">By {r.userName || "Aynonymous"}</div>
                        <div className="text-xl">Rating: {r.rating}/5</div>
                        <p className="text-xl">{r.text}</p>
                        <div className="text-xl"> {new Date(r.createdAt).toLocaleString()} </div>
                    </div>
                ))}
            </div>
        </>
    );
}