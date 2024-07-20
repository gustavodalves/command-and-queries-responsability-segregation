import { UserDao } from "./app/dao";

export default class GetUserByName {
    constructor(
        private readonly userDao: UserDao
    ) {}

    async execute(
        name: string
    ) {
        const user = await this.userDao.findBy(name)

        if(!user) {
            throw new Error("User not founded")
        }

        return user
    }
}