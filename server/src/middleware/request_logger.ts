import { Request, Response, NextFunction } from "express";

function requestLogger(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
}

export default requestLogger;