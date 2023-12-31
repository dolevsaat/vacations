import express, { Request, Response, NextFunction } from "express";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router();

// POST http://localhost:4000/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/captcha", async (request: Request, response: Response) => {
    try {
        const captcha = authService.createCaptcha();
        response.status(200).json(captcha);
    }
    catch (err) {
        response.status(500).send(err);
    }
});


export default router;