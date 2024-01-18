import ICommand from "./command";

export default class CreateUserCommand implements ICommand {
    commandName: string = "CreateUserCommand";
    constructor(
        readonly name: string,
    ) {}
}