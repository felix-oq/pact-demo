import express, {Express} from 'express';
import requestLogger from './middleware/request_logger';
import createUsersRouter from './routes/api/users';
import { UserManager } from './user_manager';

function createApp(userManager : UserManager) : Express {
    const app = express();

    app.use(requestLogger);
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use('/api/users', createUsersRouter(userManager));
    return app;
}

export default createApp;