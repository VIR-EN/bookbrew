// app/search/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import type {Book} from "@/types/book"
import Header from "@/components/Header";
import AddReviewPage from "@/app/addReview/page";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q'); //Grab the Search Query from the URL
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(false);

    useEffect(() => {
        if (query) {
            fetchBooks(query)
        }
    }, [query]);

    console.log(books);

    const fetchBooks = async (searchQuery: string) => {
        try {
            const response = await fetch(`/api/books?q=${encodeURIComponent(searchQuery)}`); //Calls our API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBooks(data.books);
        }
        catch (error) {
            console.log(error)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className = "flex items-center justify-center h-screen">
                <h1 className = "font-bold text-5xl">Loading...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div className = "flex items-center justify-center h-screen">
                <h1 className = "text-red-500 font-bold text-5xl">Error Fetching Books</h1>
            </div>
        )
    }

    if (books.length === 0) {
        return (
            <div className = "flex items-center justify-center h-screen">
                <h1 className = "text-red-500 font-bold text-5xl">No Books Found!</h1>
            </div>
        )
    }
    return (
        <>
            <Header/>
            <div className="max-w-4xl mx-auto p-6 space-y-4">
                {books.map((book: Book) => (
                    <div key={book.id} className="border rounded-md p-2">
                        <div className = "flex">
                            <img src = {book.image} alt = {book.title} />
                            {/* Text Container */}
                            <div className = "w-full flex flex-col">
                                <div>
                                    <h1 className="capitalize text-4xl font-semibold text-gray-800 pl-2">
                                        {book.title}
                                    </h1>
                                    <div className = "pl-2">
                                        {book.authors.map((author: any) => (
                                        <p key = {author.name} className="text-xl text-gray-600 mr-5">By {author.name} </p>
                                        ))}
                                    </div>
                                </div>

                                <div className = "pl-2 flex-1 flex flex-col justify-center">
                                    <Link
                                        href={`/addReview/?title=${encodeURIComponent(book.title)}&bookId=${encodeURI(book.id)}`}
                                        rel="noopener noreferrer" target="_blank"
                                        className="bg-gray-500 text-white font-bold border rounded-md mb-2 p-2 h-fit w-fit"
                                    >Add A Review
                                    </Link>

                                    <Link
                                        href={`/books/${book.id}/reviews?title=${encodeURIComponent(book.title)}`}
                                        className="bg-blue-400 text-white font-bold rounded-md p-2 h-fit w-fit">View Reviews
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}