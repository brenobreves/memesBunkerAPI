import { MemesTypes } from "@prisma/client";
import { CustomContext } from "../customContextTypes";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth"
import { createMeme, deleteMeme, getUserMemes, updateMeme } from "../repository";
import { createMemesSchema } from "../schemas";
import { validMeme, AuthUser } from "../services";

export const memes = new Hono

memes.use('*',
    bearerAuth({
        verifyToken: async (token, c: CustomContext) => {
            const auth = await AuthUser(c , token)
            if(!auth) return false
            return true
        },
    })
)

memes.post('/', async (c: CustomContext)=>{
    try {
        if(!c.req.user_id) throw{error:"User id validation error"}
        const body = await c.req.json() as {link:string, type: MemesTypes}
        const { error } = createMemesSchema.validate(body)
        if (error) {
           return c.text(error.message, 400)
        }
        const newMeme = await createMeme(c.req.user_id, body.type, body.link)
        return c.json(newMeme, 201)
        
    } catch (e) {
        return c.text(`${JSON.stringify(e, null, 2)}`, 500)
    }

})

memes.get('/', async (c: CustomContext)=>{
    try {
        if(!c.req.user_id) throw{error:"User id validation error"}
        const memes = await getUserMemes(c.req.user_id)
        return c.json(memes)
        
    } catch (e) {
        return c.text(`${JSON.stringify(e, null, 2)}`, 500)
    }
})

memes.put('/:meme_id', async (c: CustomContext)=>{
    try {
        if(!c.req.user_id) throw{error:"User id validation error"}
        const meme_id = c.req.param("meme_id")
        const valid = await validMeme(meme_id, c.req.user_id)
        if(!valid){
            return c.text("Meme não encontrado ou não pertence ao usuário", 400)
        }
        const body = await c.req.json() as {link:string, type: MemesTypes}
        const { error } = createMemesSchema.validate(body)
        if (error) {
            return c.text(error.message, 400)
        }
        const updatedMeme = await updateMeme(meme_id, body.type, body.link)
        return c.json(updatedMeme, 200)

    } catch (e) {
        return c.text(`${JSON.stringify(e, null, 2)}`, 500)
    }
})

memes.delete('/:meme_id', async (c: CustomContext)=>{
    try {
        if(!c.req.user_id) throw{error:"User id validation error"}
        const meme_id = c.req.param("meme_id")
        const valid = await validMeme(meme_id, c.req.user_id)
        if(!valid){
            return c.text("Meme não encontrado ou não pertence ao usuário", 400)
        }
        const deleted = await deleteMeme(meme_id)
        return c.json(deleted, 200)

    } catch (e) {
        return c.text(`${JSON.stringify(e, null, 2)}`, 500)
    }
})
