import { User } from "./model/user";

class UserManager {
    users: User[];
    nextUserId: number;

    constructor() {
        this.users = [
            new User(1, 'John Doe', 'john.doe@mail.com'),
            new User(2, 'Jane Doe', 'jane123@mail.com')
        ];
        this.nextUserId = 3;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User | undefined {
        return this.users.find((user: User) => user.id === id);
    }

    addUser(user: User) {
        this.users.push(user);
    }

    updateUser(id: number, name?: string, email?: string): User | undefined {
        const userToUpdate = this.getUser(id);
        if (!userToUpdate) {
            return undefined;
        }
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.email = email || userToUpdate.email;
        return userToUpdate;
    }

    deleteUser(id: number) {
        const lengthBefore = this.users.length;
        this.users = this.users.filter((user: User) => user.id !== id);
        console.log(lengthBefore + " " + this.users.length);
        return lengthBefore !== this.users.length;
    }

    takeNextUserId(): number {
        return this.nextUserId++;
    }
}

export {UserManager};