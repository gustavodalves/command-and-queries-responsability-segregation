import UserDatabase from "../../../../fakes/database/user";
import User from "../domain/models/user";
import UserRepository from "../domain/repositories/user-repository";

export default class UserRepositoryInMemory implements UserRepository {
    private readonly database: UserDatabase = UserDatabase.getInstance()

    async save(user: User): Promise<void> {
        await this.database.insert({
            id: user.getId().value,
            name: user.getName()
        })
    }
}
