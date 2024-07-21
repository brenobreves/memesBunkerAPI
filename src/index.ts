import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { user } from './routes'

export const prisma = new PrismaClient()
const app = new Hono()
prisma.$connect()

app.get('/heatbeat', (c) => {
  return c.text('It lives!!!')
})

app.route('/user', user)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
