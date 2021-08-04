import getPort from 'get-port';
import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import app from '../../src/app';
import { Server } from 'http';
import path from 'path';

let port : Number;
let server : Server;

describe("Pact Verification", () => {

    beforeEach(async () => {
        port = await getPort();
        server = app.listen(port, () => console.log(`Provider service listening on http://localhost:${port}`));
    });

    it("should validate the expectations of Client", async () => {
        const verifier = new Verifier({
            logLevel: "warn",
            provider: "Server",
            providerVersion: "1.0.0",
            providerBaseUrl: `http://localhost:${port}`,
            pactUrls: [
                path.resolve(__dirname, '../../../client/pacts/client-server.json')
            ]
        });
        await verifier.verifyProvider().finally(() => server.close());
    });
});