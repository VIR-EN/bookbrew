"use client";
import React from "react";
import {useNavigate} from "react-router-dom";
import insertReview from "@/lib/insertReview";
import {Button, Textarea} from "@mui/joy";
import {TextField, Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useState} from "react";

// Form component for user to fill in their review
export default function AddReviewForm({bookId}: {bookId: number}) {
    const [reviewTitle, setReviewTitle] = useState("");
    const [rating, setRating] = React.useState<number | null>(0);
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const [buttonClick, setButtonClick] = React.useState<HTMLButtonElement | null>(null);
    const handleClose = () => {
        setButtonClick(null);
        navigate(-1);
    };

    const updateRating = (newRating: number | null) => {
        setRating(newRating);
    }

    return (
        <form className="flex flex-col justify-center w-3/4 bg-red-100 rounded-xl p-4 m-10"
                onSubmit={async(event) => {
                    insertReview(bookId, reviewTitle, rating, text)
                        .then(response => {
                            console.log("Adding review...");
                        })
                        .catch((error) => {
                            console.log("ERROR ENCOUNTERED WHEN ADDING REVIEW");
                        });
                }}>
            <div className="m-2">
                <TextField
                    variant="standard"
                    sx={{width: "80%"}}
                    label="Title"
                    value={reviewTitle}
                    onChange={event => setReviewTitle(event.target.value)}
                />
            </div>
            <div className="m-2">
                <Rating
                    name="user-rating"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue)=> updateRating(newValue)}
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
                    placeholder="Enter your reivew..."
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="m-2">
                <Button
                    onClick={() => {
                        insertReview(bookId, reviewTitle, rating, text)
                        .catch(error => {console.log("FAILURE: 'Submit' button fail")})
                        handleClose()
                    }}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}