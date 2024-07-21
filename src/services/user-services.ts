import { StatusCode } from "hono/utils/http-status";
import { createSession, deleteUserSessions, findUserByEmail } from "../repository";
import bcrypt from 'bcrypt'

export async function validateUser(email:string, password:string): Promise<{
    message: string;
    code: StatusCode;
    auth?: string | undefined;
}> {
    const user = await findUserByEmail(email)
    if(!user) return {message:"Usuário não encontrado", code:404}
    const correctPassword = await bcrypt.compare(password, user.password_hash)
    if(!correctPassword) return {message:"Senha incorreta", code:400}
    await deleteUserSessions(user.id)
    const newSession = await createSession(user.id)
    return {message:"Login efetuado com sucesso", code:200, auth: newSession.id}
}