interface User {
    id: string
    name: string
}

export default class UserDatabase {
    private readonly data: User[] = []

    private constructor() {}

    private static instance: UserDatabase | null = null

    static getInstance() {
        if(!this.instance) {
            this.instance = new UserDatabase()
        }

        return this.instance
    }

    async insert(user: User) {
        this.data.push(user)
    }

    async findBy(clause: 'id' | 'name', value: unknown) {
        return this.data.find(item => item[clause] === value)
    }
}
