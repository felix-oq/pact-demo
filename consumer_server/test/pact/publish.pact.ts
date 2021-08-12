import pact, { PublisherOptions } from '@pact-foundation/pact-node';
import * as child from 'child_process'
import path from 'path';

async function publish() {
    const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:9292';

    const gitHash = child.execSync('git rev-parse HEAD').toString().trim();

    const options: PublisherOptions = {
        pactFilesOrDirs: [path.resolve(__dirname, "..", "..", "pacts")],
        pactBroker: pactBrokerUrl,
        consumerVersion: gitHash
    };

    try {
        await pact.publishPacts(options);
    } catch (error) {
        process.stderr.write('Pact contract publishing was not successful: ', error);
    };
}

export default publish;