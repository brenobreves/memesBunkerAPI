import { MemesTypes } from "@prisma/client";
import { prisma } from "..";

export async function createMeme(user_id: string, type: MemesTypes, link: string) {
    return prisma.memes.create({
        data: {
            user_id,
            type,
            link
        }
    })
}
