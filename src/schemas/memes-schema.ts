import Joi from "joi";

export const createMemesSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    type: Joi.string().valid("link","image").required(),
    link: Joi.string().required(),
})
