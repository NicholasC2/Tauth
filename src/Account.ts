export class Account {
    username: string;
    passwordHash: string;
    createdAt: number;

    constructor(
        username: string,
        passwordHash: string,
        createdAt: number
    ) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }
}