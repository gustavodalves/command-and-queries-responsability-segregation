import { SQSClient, CreateQueueCommand, SendMessageCommand, GetQueueUrlCommand } from "@aws-sdk/client-sqs";
import { Consumer } from 'sqs-consumer'
import Event from "../../commom/event";
import Entity from "../../commom/entity";
import { EventHandler, EventHandlerController } from "../../users/handlers/event-handler";
import Env from "../../../env";

const config = {
    AWS_REGION: Env.get('AWS_REGION'),
    AWS_ACCESS_KEY: Env.get('AWS_ACCESS_KEY'),
    AWS_SECRET_ACCESS: Env.get('AWS_SECRET_ACCESS'),
}

export class SqsQueueAdapter implements EventHandler {
    private readonly sqs = new SQSClient({
        region: config.AWS_REGION,
        credentials: {
          accessKeyId: config.AWS_ACCESS_KEY,
          secretAccessKey: config.AWS_SECRET_ACCESS,
        },
    })

    private readonly queues = new Map<string, string>()

    private consumers: Array<Consumer> = []

    async registry(eventName: string, handler: EventHandlerController): Promise<void> {
        const command = new CreateQueueCommand({
            QueueName: eventName
        })

        const result = await this.sqs.send(command)

        this.queues.set(
            eventName, result.QueueUrl!
        )
        
        const consumer = new Consumer({
            queueUrl: result.QueueUrl!,
            sqs: this.sqs,
            handleMessage: async (message) => {
                const event = JSON.parse(message.Body!) as Event;
                await handler.do(event)
            }
        })

        consumer.on("error", (err) => {
            console.error(err.message);
        })
          
        consumer.on("processing_error", (err) => {
            console.error(err.message);
        })

        consumer.start()
    }

    async getQueueUrl(queueName: string) {
        try {
            const queueUrl = await this.sqs.send(
                new GetQueueUrlCommand({
                    QueueName: queueName
                })
            )
    
            this.queues.set(queueName, queueUrl.QueueUrl!)
    
            return queueUrl.QueueUrl
        } catch {
            return undefined
        }
    }

    async publish(entity: Entity): Promise<void> {
        for(const event of entity.getEvents()) {
            let queueUrl = this.queues.get(event.eventName) || await this.getQueueUrl(event.eventName)
    
            if(!queueUrl) {
                const command = new CreateQueueCommand({
                    QueueName: event.eventName
                })
        
                const result = await this.sqs.send(command)
                queueUrl = result.QueueUrl!
            }
    
            const command = new SendMessageCommand({
                MessageBody: JSON.stringify(event),
                QueueUrl: queueUrl
            })
    
            await this.sqs.send(
                command
            )
        }
    }

    close() {
        for(const consumer of this.consumers) {
            consumer.stop()
        }

        this.sqs.destroy()
    }
}