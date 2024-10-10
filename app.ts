import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'

const app = new Hono()

app.use(logger())
app.route("/",expensesRoute)

app.get("/test", c => {
    return c.json({"message": "testing!"})
})



export default app