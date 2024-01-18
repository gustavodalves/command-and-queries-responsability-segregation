import Entity from "../../../commom/entity";
import UUID from "../../../commom/uuid";
import UserCreatedEvent from "../events/user-created";

export default class User extends Entity {
    private constructor(
        id: UUID,
        private name: string
    ) {
        super(id)
    }

    getName() {
        return this.name
    }

    static create(
        name: string
    ) {
        const user = new User(
            new UUID(),
            name
        )
        const userCreatedEvent = new UserCreatedEvent(
            user.getId().value,
            user.getName()
        )

        user.addEvent(userCreatedEvent)

        return user
    }
}
