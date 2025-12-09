export interface Review {
    id: string;          // mongo id
    bookId: string;      // from bigbook api id
    reviewTitle: string;
    rating: number;      // 1 to 5
    text: string;
    createdAt: string;
    userName?: string;
}

export interface AddReviewResponse {
    bookId: string,
    success: boolean,
}