import MessageGenerator from "./message_generator";
import { startMessagePublishing } from "./message_publisher";

main();

async function main() {
    const generator = new MessageGenerator();
    await startMessagePublishing(generator);
}