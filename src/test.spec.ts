import CreateUserCommand from "./cmd/users/commands/create-user";
import GetUserByName from "./query/get-user-by-name";
import { faker } from '@faker-js/faker';
import { Config } from "./config";
import { UserDao } from "./query/app/dao";
import CommandMediator from "./cmd/mediator";
import {  MongoClient } from "mongodb";
import { Pool } from "mysql2";
import { SqsQueueAdapter } from "./cmd/commom/infra/sqs";

jest.setTimeout(20000);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('End-to-End Test: Create and Retrieve User', () => {
    let userDao: UserDao
    let mediator: CommandMediator
    let db: MongoClient
    let mysql2Pool: Pool
    let sqs: SqsQueueAdapter

    beforeAll(async () => {
        const config = await new Config().config();
        userDao = config.userDao
        mediator = config.mediator
        db = config.db.connect
        mysql2Pool = config.pool
        sqs = config.sqs
    });

    afterAll(() => {
        mysql2Pool.end();
        db.close()
        sqs.close()
    });

    test('should create a user and retrieve it by name', async () => {
        const name = faker.person.fullName();

        await mediator.executeCommand(
            new CreateUserCommand(name)
        );

        await delay(16000)

        const getUserByNameQuery = new GetUserByName(userDao)
        const user = await getUserByNameQuery.execute(name)

        expect(user).toBeDefined()
        expect(user.name).toBe(name)
    });
});
