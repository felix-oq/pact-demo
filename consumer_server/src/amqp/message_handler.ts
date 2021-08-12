import { UserManager } from '../user_manager';
import { User } from '../model/user';

class MessageHandler {

    readonly userManager: UserManager;

    constructor(userManager: UserManager) {
        this.userManager = userManager;
    }

    handleMessageContent(messageContent: any) {
        let user: User;
        try {
            user = messageContent;
        } catch (error) {
            console.log("An error occurred during message parsing: ", error);
            console.log("Ignoring that message...");
            return;
        }

        this.userManager.addUser(user);
    }
}

export default MessageHandler;