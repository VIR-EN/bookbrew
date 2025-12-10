"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function BookBrewHomepage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#e7ddd3] flex items-center justify-center px-4 relative">
            <div className="bg-[#f4ede6] w-full max-w-2xl rounded-2xl shadow-lg border border-[#3d2e1f] p-10 flex flex-col items-center text-center">
                <h1 className="text-6xl font-extrabold text-[#3d2e1f] mb-3">
                    BookBrew
                </h1>

                <p className="text-lg text-[#5c4635] mb-8">
                    Search and read reviews from real readers
                </p>

                <form onSubmit={handleSearch} className="w-full flex gap-3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by book title or author..."
                        className="flex-1 px-5 py-3 rounded-full border border-[#3d2e1f] bg-white"
                    />

                    <button
                        type="submit"
                        className="bg-[#3d2e1f] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#2a1e14]"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}
