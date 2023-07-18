import Joi from "joi";

class followerModel {
    public userId: number;
    public vacationId: number;

    public constructor(follower: followerModel) {
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }

    private static ValidationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        vacationId: Joi.number().required().positive().integer(),
    });

    public validate(): string {
        const result = followerModel.ValidationSchema.validate(this);
        return result.error?.message;
    }
};

export default followerModel;