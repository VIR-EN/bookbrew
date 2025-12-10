
export interface Author {
    id: number;
    name: string;
}

export interface Rating {
    average: number;
}

export interface Book {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    authors: Author[];
    rating?: Rating;
}

export interface SearchBooksResponse {
    available: number;
    number: number;
    offset: number;
    books: Book[][];
}
