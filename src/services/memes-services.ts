import { getMemeById } from "../repository/memes-repositories"

export async function validMeme(meme_id: string, user_id: string){
    if(!meme_id.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) return false
    const meme = await getMemeById(meme_id)
    if(!meme || meme.user_id !== user_id) return false
    return true
}