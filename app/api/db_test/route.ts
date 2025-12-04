// a file to make sure the connection to mongo works
import {getDb} from "@/lib/mongo";
import {NextResponse} from "next/server";


// makes sure the connection to mongo works
export async function GET() {
    try {
        const db = await getDb();
        const collections = await db.listCollections().toArray();

        return NextResponse.json({
            connected: true,
            collections: collections.map((c) => c.name),
        });
    } catch (err: any) {
        return NextResponse.json(
            { connected: false, error: err.message },
            { status: 500 }
        );
    }
}