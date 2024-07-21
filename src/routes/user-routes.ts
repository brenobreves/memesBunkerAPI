import { Hono } from "hono";
import { loginSchema, registerSchema } from "../schemas";
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from "../repository";
import { validateUser } from "../services";

export const user = new Hono

user.post('/signin', async (c) => {
    try {
        const body = await c.req.json() as {email:string, password:string}
        const { error } = loginSchema.validate(body)
        if (error) {
            return c.text(error.message, 400)
        }

        const userValidation = await validateUser(body.email, body.password)


        return c.json({message: userValidation.message, auth: userValidation.auth}, userValidation.code)

    } catch(e) {
        return c.text(`${e}`, 500)
    }
})

user.post('/signup', async (c) => {
    try {
        const body = await c.req.json() as {email:string, name:string, password:string}
        const { error } = registerSchema.validate(body)
        if (error) {
            return c.text(error.message, 400)
        }
        const dupUser = await findUserByEmail(body.email)
        if(dupUser){
            return c.text("E-mail already registered",400)
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(body.password, salt)
        const newUser = await createUser({
            name: body.name,
            email: body.email,
            password_hash: passwordHash
        })
        return c.text(`New user created: ${JSON.stringify(newUser,null,2)}`)

    } catch(e) {
        return c.text(`${e}`, 500)
    }
})