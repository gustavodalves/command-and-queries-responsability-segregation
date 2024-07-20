import { Db, MongoClient } from "mongodb";
import Env from "../../env";

export async function connectToMongoDB() {
    const user = Env.get('MONGO_USER')
    const pwd = Env.get('MONGO_PASSWORD')
    const host = Env.get('MONGO_HOST')
    const port = Env.get('MONGO_PORT')

    const url = `mongodb://${user}:${pwd}@${host}:${port}`
    const dbName = 'myDatabase'

    const client = new MongoClient(url)

    try {
        await client.connect()
        
        return {
            database: client.db(dbName),
            connect: client,
        }
    } catch (error) {
        throw error
    }
}