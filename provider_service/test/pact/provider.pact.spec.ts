import { MessageProviderPact, Message } from '@pact-foundation/pact';
import MessageGenerator from '../../src/message_generator';
import * as child from 'child_process'

const messageGenerator = new MessageGenerator();

const gitHash = child.execSync('git rev-parse HEAD').toString().trim();

describe("Message Provider tests", () => {
    const pact = new MessageProviderPact({
        messageProviders: {
            "a message containing a user": () => {
                return new Promise((resolve) => {
                    resolve(messageGenerator.createRandomUser());
                });
            }
        },
        provider: "Provider Service",
        providerVersion: gitHash,
        pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:9292",
        publishVerificationResult: true
    });
    describe("Provider Service", () => {
        it("sends a valid user", () => {
            return pact.verify();
        })
    })
});