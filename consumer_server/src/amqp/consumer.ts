import * as amqp from 'amqplib';
import { Connection, Channel } from 'amqplib';
import { User } from '../model/user';
import { UserManager } from '../user_manager';

async function startAmqpConsumer(userManager: UserManager) {
    const RETRY_DELAY = 5;
    let connection: Connection | null = null;
    while(connection == null) {
        try {
            connection = await amqp.connect('amqp://localhost');
        } catch (error) {
            console.log("Unable to connect to amqp service: ", error);
            console.log(`Retrying in ${RETRY_DELAY} seconds...`);

            await new Promise(f => setTimeout(f, RETRY_DELAY * 1000));
        }
    }

    let channel: Channel;
    try {
        channel = await connection.createChannel();
    } catch (error) {
        console.log("An error occurred during channel creation: ", error);
        process.exit(1);
    }

    const QUEUE_NAME = 'users';
    try {
        await channel.assertQueue(QUEUE_NAME)
    } catch (error) {
        console.log("An error occurred during queue assertion: ", error);
        process.exit(1);
    }

    channel.consume(QUEUE_NAME, (message) => {
        if (message) {
            let user: User;
            const messageContent = message?.content.toString();
            console.log(`Received message with content: ${messageContent}`)
            try {
                user = JSON.parse(messageContent);
            } catch (error) {
                console.log("An error occurred during message parsing: ", error);
                console.log("Ignoring that message...");
                return;
            }

            userManager.addUser(user);
        }
    }, {noAck: true});
}

export default startAmqpConsumer;