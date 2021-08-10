import startAmqpConsumer from "./amqp/consumer";
import createApp from "./app";
import { UserManager } from "./user_manager";

const DEFAULT_PORT = 5000;

main();

async function main() {
    const PORT = getPort(DEFAULT_PORT);
    const userManager = new UserManager();
    await startAmqpConsumer(userManager);
    const app = createApp(userManager);
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

function getPort(defaultPort: number): number {
    if (process.env.PORT) {
        const envPort = parseInt(process.env.PORT);
        if (!Number.isNaN(envPort) && 1<<10 <= envPort && envPort < 1<<16) {
            return envPort;
        } else  {
            console.log(`Invalid port ${process.env.PORT} specified`);
        }
    }
    return defaultPort;
}