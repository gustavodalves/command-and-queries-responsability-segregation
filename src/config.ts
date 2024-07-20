import CommandMediator from "./cmd/mediator"
import { MySQL2ConnectionAdapter, MySQL2Connector } from "./cmd/commom/infra/mysql2"
import { SqsQueueAdapter } from "./cmd/commom/infra/sqs"
import { UserRepositoryMySql2 } from "./cmd/users/infra/user-repository-mysql2"
import Env from "./env"
import { connectToMongoDB } from "./query/infra/mongo"
import UserDaoMongo from "./query/infra/user-dao"
import { AddNewUserEventHandler } from "./query/update-handler/new-user"
import { CreateUserHandler } from "./cmd/users/handlers/create-user-handler"

export class Config {
    async config() {
        const mediator = new CommandMediator()

        const pool = new MySQL2Connector({
            database: Env.get('MYSQL_DATABASE'),
            host: Env.get('MYSQL_HOST'),
            password: Env.get('MYSQL_PASSWORD'),
            port: +Env.get('MYSQL_PORT'),
            user: Env.get('MYSQL_USER')
        }).getPool()

        const db = await connectToMongoDB()
        const userDao = new UserDaoMongo(db.database)

        const handler = new AddNewUserEventHandler(userDao)

        const adapter = new MySQL2ConnectionAdapter(pool)
        
        const userRepository = new UserRepositoryMySql2(adapter)
        const sqs = new SqsQueueAdapter()

        const createUserHandler = new CreateUserHandler(userRepository, sqs)
        mediator.addHandler(createUserHandler)

        await sqs.registry('UserCreatedEvent', handler)

        return {
            sqs,
            mediator,
            userDao,
            db,
            pool
        }
    }
}
