import { Matchers, synchronousBodyHandler } from '@pact-foundation/pact';
import { JestMessageConsumerOptions, messagePactWith } from 'jest-pact';
import path from "path";
import MessageHandler from '../../src/amqp/message_handler';
import { User } from '../../src/model/user';
import { UserManager } from '../../src/user_manager';

const options : JestMessageConsumerOptions = {
    consumer: "Consumer Server",
    provider: "Provider Service",
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: 'warn',
    dir: path.resolve(process.cwd(), 'pacts')
}

const exampleUser : User = {
    id: 1,
    name: "Max Mustermann",
    email: "max@mail.com"
};

const userManager = new UserManager();
const messageHandler = new MessageHandler(userManager);

messagePactWith(options, async (messagePact) => {

    describe("receive message", () => {
        it("accepts a valid user", () => {

            return messagePact
            .given("sending users")
            .expectsToReceive("a message containing a user")
            .withContent(
                Matchers.like(exampleUser)
            )
            .withMetadata({
                "content-type": "application/json",
                "queue": "users",
            })
            .verify(synchronousBodyHandler((body) => messageHandler.handleMessageContent(body)));
        });
    });
});