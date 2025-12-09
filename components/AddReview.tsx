"use client";
import React from "react";
import insertReview from "@/lib/insertReview";
import {Button, Textarea} from "@mui/joy";
import {TextField, Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useState} from "react";

// Form component for user to fill in their review
export default function AddReviewForm(
    {bookId, bookTitle}: {bookId: string, bookTitle: string},) {
    const [reviewTitle, setReviewTitle] = useState("");
    const [rating, setRating] = React.useState<number | null>(0);
    const [text, setText] = useState("");

    const handleSubmitClose = () => {
        // window.location.href =
        //     `/addReview/?title=${encodeURIComponent(bookTitle)}&bookId=${encodeURI(bookId)}`;
        // window.location.href = "/";
    };

    const clearInputs = () => {
        setReviewTitle("");
        setRating(0);
        setText("");
    }

    const updateRating = (newRating: number | null) => {
        setRating(newRating);
    }

    return (
        <form className="flex flex-col justify-center w-3/4 bg-red-100 rounded-xl p-4 m-10"
              onSubmit={async(event) => {
                  insertReview(bookId, reviewTitle, rating, text)
                      .then((response) =>{
                          console.log(response.success);
                      })
                      .catch((error) => {
                          console.log(error);
                      });
                  event.preventDefault();
                  clearInputs();
              }}
        >
            <h1 className="capitalize text-3xl font-semibold text-[#3d2e1f] pl-2 text-center mt-9"> Reviews for {bookTitle || `Book #${bookId}`} </h1>
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
                    sx={{width:"80 px"}}
                    type="submit"
                    disabled={reviewTitle === "" || text === ""}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}