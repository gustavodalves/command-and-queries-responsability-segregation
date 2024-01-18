import * as crypto from "crypto"

export default class UUID {
    public readonly value: string

    constructor(
        value?: string
    ) {
        this.value = value || crypto.randomUUID()
    }
}