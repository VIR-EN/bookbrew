import { MongoClient, Db } from "mongodb";

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

export const DB_COLLECTION = process.env.COLLECTION as string;

// check validity of env vars
if (!URI) {
    throw new Error("no MONGO_URI");
}
if (!DB_NAME) {
    throw new Error("no MONGODB_DB");
}

let client: MongoClient | null = null; // holds instance
let clientPromise: Promise<MongoClient> | null = null;

// creates new client with uri and that connection can be reused
async function getClient(): Promise<MongoClient> {
    if (!clientPromise) {
        client = new MongoClient(URI as string);
        clientPromise = client.connect();
    }
    return clientPromise;
}

// function that is used to get the DB object, makes sure there is a connected mongo client first
export async function getDb(): Promise<Db> {
    return (await getClient()).db(DB_NAME);
}