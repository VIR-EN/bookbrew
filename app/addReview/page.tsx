// By Erin: The "Add Review" page which displays the form component.
"use client";
import AddReviewForm from "@/components/AddReview";
import Header from "@/components/Header";
import {useSearchParams} from "next/navigation";

export default function AddReviewPage() {
    // Extract these fields from the url!
    const bookId = useSearchParams().get("bookId") ?? "";
    const bookTitle = useSearchParams().get("title") ?? "";
    const bookImg = useSearchParams().get("bookImg") ?? "";
    return (
        <>
            <title> BookBrew | Add A Review </title>
            <main className="flex flex-col items-center justify-center w-full">
                {/* Render the main content */}
                <AddReviewForm
                    bookId={bookId}
                    bookTitle={bookTitle}
                    bookImg={bookImg}
                />
            </main>
        </>
    );
}