import { MemesTypes } from "@prisma/client";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth"
import { createMeme } from "repository/memes-repositories";
import { createMemesSchema } from "schemas/memes-schema";
import { AuthUser } from "services/auth-services";


export const memes = new Hono

memes.use(
    bearerAuth({
        verifyToken: async (token, c) => {
            const body = await c.req.json()
            if(!body.user_id) return false
            const auth = await AuthUser(c, body.user_id, token)
            return auth
        },
    })
)

memes.post('/', async (c)=>{
    try {
        const body = await c.req.json() as {user_id:string, link:string, type: MemesTypes}
        const { error } = createMemesSchema.validate(body)
        if (error) {
           return c.text(error.message, 400)
        }
        const newMeme = await createMeme(body.user_id, body.type, body.link)
        return c.json(newMeme, 201)
        
    } catch (e) {
        return c.text(`${e}`, 500)
    }

})
