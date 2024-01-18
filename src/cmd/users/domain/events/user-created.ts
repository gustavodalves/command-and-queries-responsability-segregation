import Event from "../../../commom/event";

export default class UserCreatedEvent implements Event {
    when: Date = new Date;

    constructor(
        readonly id: string,
        readonly name: string
    ) {}
}
