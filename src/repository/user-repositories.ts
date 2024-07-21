import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function findUserByEmail(email: string){
    return prisma.user.findUnique({
        where:{
            email: email
        }
    })
}

export async function findUserSessions(user_id: string){
    return prisma.sessions.findMany({
        where:{
            user_id: user_id
        }
    })
}

export async function createUser(user: Prisma.UserCreateInput) {
    return prisma.user.create({
        data: user
    })
}