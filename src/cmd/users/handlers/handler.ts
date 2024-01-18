import ICommand from "../commands/command";

export default interface IHandler {
    commandName: string
    handle(command: ICommand): Promise<void>
}
