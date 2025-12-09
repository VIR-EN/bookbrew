// app/search/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import Header from "@/components/Header";

/* This component was implemented by Deanson */
/* This component decodes the search parameters from the URL, calls the external BookBook API and displays
each book's image, title, author */
 /* Each book <div> has a Link component for adding and viewing reviews respectively */
export default function SearchPage() {
    const searchParams = useSearchParams(); //We ended up passing the search query in the URL and using the useSearchParams() hook to access them as it was the most convenient method as compared to useParams()
    const query = searchParams.get('q'); //Grab the Search Query from the URL
    const [books, setBooks] = useState([]); //Used to store the array of books
    const [loading, setLoading] = useState(true); //Used for logic when books are still being fetched
    const[error, setError] = useState(false); //Used for logic when fetch fails

    useEffect(() => {
        //Runs automatically whenever the user searches something (after they press enter)
        if (query) {
            fetchBooks(query)
        }
    }, [query]);

    /* This function essentially fetches the array of books related to the search query. It sets the loading variable to true
    while fetching and sets the error variable to true if it fails to fetch.
     */
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
            <div className="max-w-4xl mx-auto p-6">
                {books.map((book: any) => (
                    <div key={book.id} className="border bg-[#EFE9E3] rounded-md p-2 m-4">
                        <div className = "flex h-60">
                            <img src = {book.image} alt = {book.title} className = "border h-full w-40"/>
                            {/* Text Container */}
                            <div className = "w-full flex flex-col">
                                <div>
                                    <h1 className="capitalize text-3xl font-semibold text-[#4b3621] pl-2">
                                        {book.title}
                                    </h1>
                                    <div className = "pl-2">
                                        {book.authors.map((author: any) => (
                                            <p key = {author.name} className="text-xl text-[#4b3621] mr-5">By {author.name} </p>
                                        ))}
                                    </div>
                                </div>

                                <div className = "pl-2 flex-1 flex flex-col justify-center">
                                    <Link
                                        href={`/addReview/?title=${encodeURIComponent(book.title)}&bookId=${encodeURI(book.id)}`}
                                        className="bg-[#C9B59C] text-black font-bold border rounded-md mb-2 p-2 h-fit w-31 text-center hover:bg-[#4b3621] hover:text-[#F9F8F6]"
                                    >Add A Review
                                    </Link>

                                    <Link
                                        href={`/books/${book.id}/reviews?title=${encodeURIComponent(book.title)}`}
                                        className="bg-[#C9B59C] text-black font-bold border rounded-md p-2 h-fit w-31 text-center hover:bg-[#4b3621] hover:text-[#F9F8F6]">View Reviews
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