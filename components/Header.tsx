//Global Navigation Header with Authentication Controls
// by Viren
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Header() {
    const { data: session, status } = useSession();
    // Extracts the session object and loading status from NextAuth
    // status reflects whether authentication is loading, authenticated, or unauthenticated
    return (
        <header className="w-full bg-[#4b3621] text-white px-6 py-4 flex items-center justify-between">

            <Link href="/" className="text-2xl font-bold tracking-wide">
                BookBrew
            </Link>

            {/* Auth Button */}
            <div>
                {status === "loading" ? (
                    <span className="text-sm opacity-80">Loading...</span>
                ) : session?.user ? (
                    <div className="flex items-center gap-4">
            <span className="text-sm opacity-90">
              Hi, {session.user.name}
            </span>
                        <button
                            onClick={() => signOut()}
                            className="bg-[#C9B59C] text-black px-4 py-1 rounded hover:bg-[#EFE9E3]"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="bg-[#C9B59C] text-black px-4 py-1 rounded hover:bg-[#EFE9E3]"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
