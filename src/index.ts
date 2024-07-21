import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = new Hono()
prisma.$connect()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
