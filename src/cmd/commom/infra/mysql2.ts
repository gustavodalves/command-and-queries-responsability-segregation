import mysql2 from "mysql2"

export interface Connection {
    query<T>(
        query: Query
    ): Promise<T | undefined>
}

export type Query = {
    statement: string,
    data: any[],
    transaction?: boolean
}

type Options = {
    host: string,
    port: number,
    password: string,
    user: string,
    database: string
}

export class MySQL2Connector {
    private _pool: mysql2.Pool

    constructor(
        readonly options: Options
    ) {
        this._pool = this.connect(options)
    }

    connect({
        database, host, password, port, user
    }: Options) {
        return mysql2.createPool({
            database, host, password, port, user
        })
    }

    getPool() {
        return this._pool
    }
}

export class MySQL2ConnectionAdapter implements Connection {
    constructor(
        private readonly pool: mysql2.Pool
    ) {}

    async query<T>(query: Query): Promise<T> {
        return new Promise((resolve, reject) => {
            const pool = this.pool as any
            pool.query(
                query.statement,
                query.data,
                (err: any, result: any) => {
                    if(err) reject(err)
                    resolve(result as any)
                }
            )
        })
    }
}