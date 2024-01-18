import UserDatabase from "../../fakes/database/user";

export default class GetUserByName {
    private readonly userDatabase: UserDatabase = UserDatabase.getInstance()

    findByName(
        name: string
    ) {
        return this.userDatabase.findBy('name', name)
    }
}