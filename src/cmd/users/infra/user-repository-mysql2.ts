import { MySQL2ConnectionAdapter } from '../../commom/infra/mysql2';

import User from '../domain/models/user';
import UserRepository from '../domain/repositories/user-repository';

export class UserRepositoryMySql2 implements UserRepository {

    constructor(private readonly connection: MySQL2ConnectionAdapter) {}

    async save(user: User): Promise<void> {
        const query = 'INSERT INTO users (id, name) VALUES (?, ?)';
        const values = [user.getId().value, user.getName()];
        await this.connection.query({
            statement: query,
            data: values
        })
    }
}
