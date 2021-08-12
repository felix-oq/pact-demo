import getPort from 'get-port';
import { Verifier } from '@pact-foundation/pact';
import { Server } from 'http';
import { UserManager } from '../../src/user_manager';
import createApp from '../../src/app';
import * as child from 'child_process'

let port : Number;
let server : Server;

const gitHash = child.execSync('git rev-parse HEAD').toString().trim();

describe("Pact Verification", () => {

    beforeEach(async () => {
        port = await getPort();
        server = createApp(new UserManager()).listen(port, () => console.log(`Provider service listening on http://localhost:${port}`));
    });

    it("should validate the expectations of Client", async () => {
        const verifier = new Verifier({
            logLevel: "warn",
            provider: "Consumer Server",
            providerVersion: gitHash,
            providerBaseUrl: `http://localhost:${port}`,
            pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:9292",
            publishVerificationResult: true
        });
        await verifier.verifyProvider().finally(() => server.close());
    });
});