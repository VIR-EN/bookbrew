// app/search/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q'); //Grab the Search Query from the URL
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (query) {
            fetchBooks(query);
        }
    }, [query]);

    const fetchBooks = async (searchQuery: string) => {
        const response = await fetch(`/api/books?q=${encodeURIComponent(searchQuery)}`); //Calls our API endpoint
        const data = await response.json();
        setBooks(data.books);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="space-y-4">
                {books.map((book: any) => (
                    <div key={book.id} className="border border-gray-200 p-4">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {book.title}
                        </h1>
                        {book.authors.map((author: any) => (
                        <p key = {author.name} className="text-gray-600 mr-5">By {author.name} </p>
                        ))}
                        <Link href={"/"} className = "mr-5 text-blue-600 border-b">Add A Review</Link>
                        <Link href={"/"} className = "text-blue-600 border-b">View Reviews</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}