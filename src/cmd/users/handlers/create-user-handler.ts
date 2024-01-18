import ICommand from "../commands/command";
import CreateUserCommand from "../commands/create-user";
import User from "../domain/models/user";
import UserRepository from "../domain/repositories/user-repository";
import IHandler from "./handler";

export default class CreateUserHandler implements IHandler {
    commandName: string = "CreateUserCommand";

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async handle(command: CreateUserCommand): Promise<void> {
        const {
            name
        } = command;

        const user = User.create(name)

        await this.userRepository.save(user)
    }
}
