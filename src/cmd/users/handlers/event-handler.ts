import Entity from "../../commom/entity";
import Event from "../../commom/event";
import IHandler from "../../commom/handler";

export interface EventHandlerController {
    do(event: Event): Promise<void>
}

export interface EventHandler {
    publish(entity: Entity): Promise<void>
    registry(eventName: string, handler: EventHandlerController): Promise<void>
}
