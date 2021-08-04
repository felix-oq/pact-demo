import express from 'express';
import requestLogger from './middleware/request_logger';
import usersRouter from './routes/api/users';

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', usersRouter);

export default app;