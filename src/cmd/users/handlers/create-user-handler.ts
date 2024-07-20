import CreateUserCommand from "../commands/create-user";
import User from "../domain/models/user";
import UserRepository from "../domain/repositories/user-repository";
import IHandler from "../../commom/handler";
import { EventHandler } from "./event-handler";

export class CreateUserHandler implements IHandler {
    commandName: string = "CreateUserCommand";

    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventHandler: EventHandler
    ) {}

    async handle(command: CreateUserCommand): Promise<void> {
        const {
            name
        } = command;

        const user = User.create(name)

        await this.userRepository.save(user)
        await this.eventHandler.publish(user)
    }
}
