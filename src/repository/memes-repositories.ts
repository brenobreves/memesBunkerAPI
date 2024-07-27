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

export async function getUserMemes(user_id: string) {
    return prisma.memes.findMany({
        where:{
            user_id
        }
    })
}

export async function getMemeById(id: string) {
    return prisma.memes.findUnique({
        where:{
            id
        }
    })
}

export async function updateMeme(id: string, type: MemesTypes, link: string) {
    return prisma.memes.update({
        where:{
            id
        },
        data:{
            link,
            type
        }
    })
}

export async function deleteMeme(id: string) {
    return prisma.memes.delete({
        where:{
            id
        }
    })
}
