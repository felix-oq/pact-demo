import express, {Request, Response, Router} from 'express';
import { User } from '../../model/user';
import { UserManager } from '../../user_manager';

function createUsersRouter(userManager: UserManager) : Router {
    const usersRouter = express.Router();

    usersRouter.get('/', (req: Request, res: Response) => {
        res.json(userManager.getAllUsers());
    });

    usersRouter.get('/:id', (req: Request, res: Response) => {
        const idParam = req.params.id;
        const parsedIdParam = parseInt(idParam);
        if (Number.isNaN(parsedIdParam)) {
            res.status(400).json({message: `Invalid id ${idParam}`});
            return;
        }
        const user = userManager.getUser(parsedIdParam);
        if (!user) {
            res.status(400).json({message: `No user with id ${parsedIdParam} exists`})
            return;
        }
        res.json(user);
    });

    usersRouter.post('/', (req: Request, res: Response) => {
        const newId = userManager.takeNextUserId();
    
        if (!req.body.name || !req.body.email) {
            res.status(400).json({message: `Please provide name and email`});
            return;
        }

        const newUser = new User(newId, req.body.name, req.body.email);
        userManager.addUser(newUser);
    
        res.json(newUser);
    });

    usersRouter.put('/:id', (req: Request, res: Response) => {
        const idParam = req.params.id;
        const parsedIdParam = parseInt(idParam);
        if (Number.isNaN(parsedIdParam)) {
            res.status(400).json({message: `Invalid id ${idParam}`});
            return;
        }
        const updatedUser = userManager.updateUser(parsedIdParam, req.body.name, req.body.email);
            if (!updatedUser) {
                res.status(400).json({message: `No user with id ${parsedIdParam} exists`})
                return;
            }
            res.json(updatedUser);
        });

        usersRouter.delete('/:id', (req: Request, res: Response) => {
        const idParam = req.params.id;
        const parsedIdParam = parseInt(idParam);
        if (Number.isNaN(parsedIdParam)) {
            res.status(400).json({message: `Invalid id ${idParam}`});
            return;
        }
        const success = userManager.deleteUser(parsedIdParam);
        if (!success) {
            res.status(400).json({message: `No user with id ${parsedIdParam} exists`})
            return;
        }
        res.send();
    });

    return usersRouter;
}

export default createUsersRouter;