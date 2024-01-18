import ICommand from "./users/commands/command";
import IHandler from "./users/handlers/handler";

export default class CommandMediator {
    private readonly handlers: IHandler[] = []

    addHandler(
        ...handlers: IHandler[]
    ) {
        handlers.forEach(item => this.handlers.push(item))
    }

    async executeCommand(
        command: ICommand
    ) {
        for(const handler of this.handlers) {
            if(handler.commandName === command.commandName) {
                await handler.handle(command)
            }
        }
    }
}
