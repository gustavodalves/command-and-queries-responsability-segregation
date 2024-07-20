import UserCreatedEvent from "../../cmd/users/domain/events/user-created";
import { EventHandlerController } from "../../cmd/users/handlers/event-handler";
import { UserDao } from "../app/dao";

export class AddNewUserEventHandler implements EventHandlerController {
    constructor(
        private readonly dao: UserDao
    ) {}

    async do(event: UserCreatedEvent): Promise<void> {
        await this.dao.add(event.id, event.name)
    }
}
