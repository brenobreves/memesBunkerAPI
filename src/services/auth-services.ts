import { Context } from "hono";
import { getSessionById } from "repository";

export async function AuthUser(c: Context, user_id: string, token: string) {
    const session = await getSessionById(token)
    if(!session || session.user_id !== user_id) return false
    return true
}