import * as amqp from 'amqplib';
import { Connection, Channel } from 'amqplib';
import { User } from './user';

main();

async function main() {
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

    while(true) {
        const randomUser = createRandomUser();
        console.log(randomUser);
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(randomUser)));
        await new Promise(f => setTimeout(f, 10000));
    }
}

function createRandomUser() : User {
    const id = Math.floor(Math.random() * 10);
    const name = (Math.random() + 1).toString(36).substring(2);
    const email = (Math.random() + 1).toString(36).substring(4) + '@' + (Math.random() + 1).toString(36).substring(6) + '.com';
    
    return new User(id, name, email)
}