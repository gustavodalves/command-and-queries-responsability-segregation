import Event from "./event";
import UUID from "./uuid";

export default abstract class Entity {
    private readonly events: Event[] = []

    constructor(
        protected readonly id: UUID
    ) {}

    getId() {
        return this.id;
    }

    addEvent(
        ...events: Event[]
    ) {
        events.forEach(item => this.events.push(item))
    }
}