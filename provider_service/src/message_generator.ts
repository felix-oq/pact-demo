import { User } from "./user";

class MessageGenerator {

    createRandomUser() : User {
        const id = Math.floor(Math.random() * 10);
        const name = (Math.random() + 1).toString(36).substring(2);
        const email = (Math.random() + 1).toString(36).substring(4) + '@' + (Math.random() + 1).toString(36).substring(6) + '.com';
        
        return new User(id, name, email)
    }

}

export default MessageGenerator;