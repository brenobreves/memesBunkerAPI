import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { user } from './routes/user-routes'
import { memes } from './routes/memes-routes'
import { cors } from 'hono/cors'

export const prisma = new PrismaClient()
const app = new Hono();
prisma.$connect()

const corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
};

app.use(cors(corsOptions))

app.get('/', (c) => {
  return c.text("It's alive!")
})

app.route('/user', user)
app.route('/memes', memes)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
