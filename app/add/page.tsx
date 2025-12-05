"use client";
import {Review} from "@/types/review";
import AddReviewForm from "@/components/AddReview";
import {useState} from "react";
import Header from "@/components/Header";

export default function AddReviewPage(bookId: number) {

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center w-full">
                <AddReviewForm
                    bookId={bookId}
                />
            </main>
        </>
    );
}