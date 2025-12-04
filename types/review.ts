export interface Review {
    id: string;          // mongo id
    bookId: number;      // from bigbook api id
    name: string;
    rating: number;      // 1 to 5
    text: string;
    createdAt: string;
}