import ICommand from "../../commom/command";

export default class CreateUserCommand implements ICommand {
    commandName: string = "CreateUserCommand";
    constructor(
        readonly name: string,
    ) {}
}