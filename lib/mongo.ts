import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
    throw new Error("no MONGO_URI");
}
if (!dbName) {
    throw new Error("no MONGODB_DB");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

async function getClient(): Promise<MongoClient> {
    if (!clientPromise) {
        client = new MongoClient(uri as string);
        clientPromise = client.connect();
    }
    return clientPromise;
}

export async function getDb(): Promise<Db> {
    const c = await getClient();
    return c.db(dbName);
}