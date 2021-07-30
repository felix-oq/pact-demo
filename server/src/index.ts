import express from 'express';
import requestLogger from './middleware/request_logger';
import usersRouter from './routes/api/users';

const app = express();

const DEFAULT_PORT = 5000;
const PORT = getPort(DEFAULT_PORT);

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', usersRouter);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

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