import { Collection, Db, ObjectId } from "mongodb";
import { UserDao, UserQueryModel } from "../app/dao";

export default class UserDaoMongo implements UserDao {
    private readonly collection: Collection;

    constructor(db: Db) {
        this.collection = db.collection('users');
    }

    async add(id: string, name: string): Promise<void> {
       await this.collection.insertOne({
            id: id,
            name
       })
    }

    async findBy(name: string): Promise<UserQueryModel | null> {
        const output = await this.collection.findOne({
            name
        })

        if(!output) {
            return null
        }

        return {
            id: output.id,
            name: output.name
        }
    }
}
