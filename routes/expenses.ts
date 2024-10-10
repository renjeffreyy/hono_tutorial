import {Hono} from "hono"

export const expensesRoute = new Hono()
    .get("/",(c) =>{
        return c.json({expense:[]})
    })
    .post("/", (c)=> {
        return c.json({})
    })
// .delete
// .put