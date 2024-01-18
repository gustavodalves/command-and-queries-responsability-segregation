import User from "../models/user";

export default interface UserRepository {
    save(user: User): Promise<void>
}