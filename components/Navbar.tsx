"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="w-full bg-[#5b4029] px-8 py-4 flex items-center justify-between text-white shadow-md">
            {/* LEFT: LOGO */}
            <Link href="/" className="text-2xl font-bold tracking-wide">
                BookBrew
            </Link>

            {/* RIGHT: AUTH CONTROLS */}
            <div className="flex items-center gap-4">
                {status === "loading" ? null : session ? (
                    <>
            <span className="text-sm">
              Hi, {session.user?.name || session.user?.email}
            </span>

                        <button
                            onClick={() => signOut()}
                            className="bg-[#e6d5bd] text-black px-4 py-1 rounded-md font-medium hover:opacity-90"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn("github")}
                        className="bg-[#e6d5bd] text-black px-4 py-1 rounded-md font-medium hover:opacity-90"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}
