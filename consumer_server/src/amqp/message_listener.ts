import * as amqp from 'amqplib';
import { Connection, Channel } from 'amqplib';
import MessageHandler from './message_handler';

async function startAmqpListener(handler: MessageHandler) {
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
            const parsedMessageContent = JSON.parse(message.content.toString());
            handler.handleMessageContent(parsedMessageContent);
        }
    }, {noAck: true});
}

export default startAmqpListener;