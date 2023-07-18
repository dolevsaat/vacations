import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
    public vacationId: number;
    public name: string;
    public description: string;
    public dateStart: string;
    public dateEnd: string;
    public price: number;
    public imageUrl: string; // Image full url
    public image: UploadedFile; // Image file

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.name = vacation.name;
        this.description = vacation.description;
        this.dateStart = vacation.dateStart;
        this.dateEnd = vacation.dateEnd;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    private static ValidationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        name: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(0).max(1000),
        dateStart: Joi.date().required(),
        dateEnd: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        imageUrl: Joi.string().required().min(0).max(100),
        image: Joi.any()
    });

    public validate(): string {
        const result = VacationModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

    // ================= PUT VALIDATION ======================
    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        name: Joi.string().optional().min(2).max(100),
        description: Joi.string().optional().min(0).max(1000),
        dateStart: Joi.date().optional(),
        dateEnd: Joi.date().optional(),
        price: Joi.number().optional().min(0).max(10000),
        imageUrl: Joi.string().optional().min(0).max(100),
        image: Joi.any()
    });

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
};

export default VacationModel;