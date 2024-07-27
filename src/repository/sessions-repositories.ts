import { prisma } from "..";

export async function createSession(user_id: string) {
    return prisma.sessions.create({
        data:{
            user_id
        }
    })
}

export async function deleteUserSessions(user_id: string) {
    return prisma.sessions.deleteMany({
        where:{
            user_id
        }
    })
}

export async function getSessionById(id: string) {
    return prisma.sessions.findUnique({
        where:{
            id: id
        }
    })
}
