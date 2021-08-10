import { JestPactOptions, pactWith } from 'jest-pact';
import path from "path";
import { API } from '../../src/api';
import { exampleUser, usersRequest, usersResponse } from './api.pact.fixtures';

const options : JestPactOptions = {
    consumer: "Client",
    provider: "Consumer Server",
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: 'warn',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2
}

pactWith(options, async (provider) => {

    describe("Consumer Server", () => {

        beforeEach(async () => {
            await provider.addInteraction({
                state: "users exist",
                uponReceiving: "a request for getting all users",
                withRequest: usersRequest,
                willRespondWith: usersResponse
            });
        });

        it("returns all users", async () => {
            const client = new API(provider.mockService.baseUrl);
            const users = await client.getUsers();
            expect(users).toStrictEqual([exampleUser]);
        });
    });
});