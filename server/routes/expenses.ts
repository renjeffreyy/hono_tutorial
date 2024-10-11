import {Hono} from "hono"
import { z } from "zod"
import { zValidator } from '@hono/zod-validator'





const fakeExpense: Expense[]  = [
    {
        "id": 1,
        "title": "expense1",
        amount: 6900
    },
    {
        "id": 2,
        "title": "expense2",
        amount: 8000
    },
    {
        "id": 3,
        "title": "expense3",
        amount: 9000
    }
]


const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

const createPostSchema = expenseSchema.omit({id: true})

type Expense = z.infer<typeof expenseSchema>



export const expensesRoute = new Hono()
    .get("/",(c) =>{
        return c.json({expense:fakeExpense})
    })
    .post("/",zValidator("json",createPostSchema) ,async (c)=> {
        const expense = await c.req.valid("json")
        fakeExpense.push({...expense, id: fakeExpense.length + 1})
        console.log(fakeExpense)
        c.status(201)
        return c.json(expense)
    })
    .get("/:id{[0-9]+}", (c) =>{
        const id = Number.parseInt(c.req.param("id"));
        const expense = fakeExpense.find((expense) => expense.id === id)
        if(!expense){
            return c.notFound()
        }

        return c.json({expense})
    })
    .get("/total-spent", (c) => {
        const total = fakeExpense.reduce((acc, expense) => acc + expense.amount,0)
        return c.json({total})
    })
    .delete("/:id{[0-9]+}", (c) =>{
        const id = Number.parseInt(c.req.param("id"));
        const index = fakeExpense.findIndex((expense) => expense.id === id)
        if(index === -1){
            return c.notFound()
        }

        const deletedExpense = fakeExpense.splice(index,1)[0]

        return c.json({expense: deletedExpense})
    })
// .put