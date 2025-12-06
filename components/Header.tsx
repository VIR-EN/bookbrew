import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-[#C9B59C] h-25 border-b-5 border-stone-400">
            <Link className= " text-stone-600 text-4xl font-semibold p-4" href="/"> BookBrew </Link>
        </header>
    );
}