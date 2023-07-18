import express, { Request, Response, NextFunction } from "express";
import path from "path";
import vacationsService from "../5-services/vacations-service";
import VacationModel from "../2-models/vacation-model";
import imageHandler from "../4-utils/image-handler";

const router = express.Router();

// GET http://localhost:4000/api/vacations
router.get(
    "/vacations",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacations = await vacationsService.getAllVacations();
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET http://localhost:4000/api/vacations-by-userId/:userId([0-9]+)
router.get(
    "/vacations-by-userId/:userId([0-9]+)",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userId = +request.params.userId;
            const vacations = await vacationsService.getVacationsByUserID(userId);
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET http://localhost:4000/api/vacations/:vacationId([0-9]+)
router.get(
    "/vacations/:vacationId([0-9]+)",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = +request.params.vacationId;
            const singleVacation = await vacationsService.getSingleVacation(
                vacationId
            );
            response.json(singleVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// POST http://localhost:4000/api/vacations
router.post(
    "/vacations",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Take image if exist:
            request.body.image = request.files?.image;

            const vacation = new VacationModel(request.body);

            const addedVacation = await vacationsService.addVacation(vacation);

            response.status(201).json(addedVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// PUT http://localhost:4000/api/vacations/edit/:vacationId([0-9]+)
router.put(
    "/vacations/edit/:vacationId([0-9]+)",
    async (request: Request, response: Response, next: NextFunction) => {
        try {

            request.body.id = +request.params.id;

            // Take image if exist:
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const updatedProduct = await vacationsService.updateVacation(vacation);
            response.json(updatedProduct);
        } catch (err: any) {
            next(err);
        }
    }
);

// DELETE http://localhost:4000/api/vacations/:vacationId([0-9]+)
router.delete(
    "/vacations/:vacationId([0-9]+)",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = +request.params.vacationId;
            await vacationsService.deleteVacation(vacationId);
            response.sendStatus(204);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET http://localhost:4000/api/vacations/images/:imageName
router.get(
    "/images/:imageName",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const imageName = request.params.imageName;
            const imagePath = imageHandler.getImagePath(imageName);
            response.sendFile(imagePath);

        } catch (err: any) {
            next(err);
        }
    }
);

export default router;
