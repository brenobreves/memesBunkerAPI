import { CustomContext } from "customContextTypes";
import { getSessionById } from "repository";

export async function AuthUser(c: CustomContext, token: string) {
    if(!token.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) return false
    const session = await getSessionById(token)
    if(!session){
        return false
    }
    c.req.user_id = session.user_id
    return true
}