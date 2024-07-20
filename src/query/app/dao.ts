export interface UserQueryModel {
    name: string,
    id: string
}

export interface UserDao {
    add(
        id: string,
        name: string
    ): Promise<void>

    findBy(name: string): Promise<UserQueryModel | null>
}
