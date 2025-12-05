"use client";
import React from "react";
import {Button} from "@mui/joy";
import {Popover} from "@mui/material";
import AddReviewForm from "@/components/AddReview";

// 'Add A Review' button Component which shows form as a popup

export default function AddReviewButton({bookId}: {bookId: number}) {
    const [buttonClick, setButtonClick] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setButtonClick(event.currentTarget);
    };

    const handleClose = () => {
        setButtonClick(null);
    };

    const open = Boolean(buttonClick);

    return (
        <div>
            <Button aria-describedby={"AddReviewButton"} onClick={handleClick}>
                Add A Review
            </Button>
            {/*<Popover*/}
            {/*    id={"AddAReviewButton"}*/}
            {/*    open={open}*/}
            {/*    anchorEl={buttonClick}*/}
            {/*    onClose={handleClose}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'bottom',*/}
            {/*        horizontal: 'left',*/}
            {/*    }}*/}
            {/*><AddReviewForm bookId={bookId} />*/}
            {/*</Popover>*/}
        </div>
    );
}