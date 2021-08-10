import getPort from 'get-port';
import { Verifier } from '@pact-foundation/pact';
import { Server } from 'http';
import { UserManager } from '../../src/user_manager';
import createApp from '../../src/app';

let port : Number;
let server : Server;

describe("Pact Verification", () => {

    beforeEach(async () => {
        port = await getPort();
        server = createApp(new UserManager()).listen(port, () => console.log(`Provider service listening on http://localhost:${port}`));
    });

    it("should validate the expectations of Client", async () => {
        const verifier = new Verifier({
            logLevel: "warn",
            provider: "Consumer Server",
            providerVersion: "1.0.0",
            providerBaseUrl: `http://localhost:${port}`,
            pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:9292"
        });
        await verifier.verifyProvider().finally(() => server.close());
    });
});