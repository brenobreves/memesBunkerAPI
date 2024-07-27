import { Context } from "hono";

export type CustomContext = Context & {
    req: {
        user_id?: string
    };
}