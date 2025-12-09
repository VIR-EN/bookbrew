"use client";
import AddReviewForm from "@/components/AddReview";
import Header from "@/components/Header";
import {useSearchParams} from "next/navigation";

export default function AddReviewPage() {
    const bookId = useSearchParams().get("bookId") ?? "";
    const bookTitle = useSearchParams().get("title") ?? "";
    return (
        <>
            <title> BookBrew | Add A Review </title>

            <main className="flex flex-col items-center justify-center w-full">
                <AddReviewForm
                    bookId={bookId}
                    bookTitle={bookTitle}
                />
            </main>
        </>
    );
}