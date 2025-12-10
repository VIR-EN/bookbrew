// By Erin: Implemented a "book review" submission form component.
// By Viren: Added sign-in authorization.
"use client";
import React from "react";
import insertReview from "@/lib/insertReview";
import { Button, Textarea } from "@mui/joy";
import { TextField, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function AddReviewForm(
    { bookId, bookTitle, bookImg }: { bookId: string, bookTitle: string, bookImg: string }
) {
    const [reviewTitle, setReviewTitle] = useState("");
    const [rating, setRating] = React.useState<number | null>(0);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();

    // Clears inputs once user submits a review for new submission
    const clearInputs = () => {
        setReviewTitle("");
        setRating(0);
        setText("");
    };

    // Updates default rating '0' to user's rating.
    const updateRating = (newRating: number | null) => {
        setRating(newRating);
    };

    // Checking if user is signed in.
    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center bg-[#C9B59C] p-6 rounded-xl m-10">
                <h2 className="text-xl font-semibold mb-4 text-[#3d2e1f]">
                    You must be signed in to write a review
                </h2>
                <Button onClick={() => signIn("github")}>
                    Sign in with GitHub
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-box items-center w-4/5">
            <div>
                <img src = {bookImg} alt = {bookTitle} className = "border size-80"/>
            </div>
            <form
                className="flex flex-col justify-center w-3/4 bg-[#EFE9E3] border rounded-xl p-4 m-10"
                onSubmit={async (event) => {
                    event.preventDefault(); // ✅ CRITICAL FIX

                    setLoading(true);

                    try {
                        const response = await insertReview(
                            bookId,
                            reviewTitle,
                            rating,
                            text
                        );

                        if (response.success) {
                            clearInputs();
                        }
                    } catch (error) {
                        console.error("Submit failed:", error);
                        alert("You must be signed in to submit a review.");
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                <h1 className="capitalize text-3xl font-semibold text-[#3d2e1f] pl-2 text-center mt-9">
                    Reviews for {bookTitle || `Book #${bookId}`}
                </h1>

                <div className="m-2">
                    <TextField
                        variant="standard"
                        sx={{ width: "80%" }}
                        label="Title of review"
                        value={reviewTitle}
                        onChange={(event) => setReviewTitle(event.target.value)}
                    />
                </div>

                <div className="m-2">
                    <Rating
                        name="user-rating"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => updateRating(newValue)}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>

                <div className="m-2">
                    <Textarea
                        sx={{
                            padding: "0.5rem",
                            height: "100px",
                            width: "100%",
                            borderRadius: 8,
                        }}
                        variant="soft"
                        placeholder="Enter your review..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="m-2">
                    <Button
                        sx={{ width: "80px" }}
                        type="submit"
                        disabled={loading || reviewTitle === "" || text === ""}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
