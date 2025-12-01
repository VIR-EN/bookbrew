"use client"
import {useState} from "react";
import {useRouter} from 'next/navigation'

export default function BookBrewHomepage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            //Passing Search Queries via URL for easy access
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="h-screen bg-white flex-col flex items-center justify-center">
            <div className = "text-center">
                <h1 className="text-6xl font-bold">
                    BookBrew
                </h1>
                <p className = "mb-2">Search And Read Book Reviews</p>
            </div>

            <div className="w-full max-w-xl">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter An Author or Book Title"
                        className="w-full px-3 py-3 border border-gray-300 rounded-full"
                    />
                </form>
            </div>
        </div>
    );
}