import Joi from "joi";

export const createMemesSchema = Joi.object({
    type: Joi.string().valid("link","image").required(),
    link: Joi.string().required(),
})
