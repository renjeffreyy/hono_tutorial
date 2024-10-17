import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { api } from "@/lib/api"



function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(()=>{
    async function fetchTotal(){
      const res = await api.expenses["total-spent"].$get()
      const data = await res.json()
      setTotalSpent(data.total)
    }
    fetchTotal()
  },[])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total ammount spent</CardDescription>
      </CardHeader>
      <CardContent>
       {totalSpent}
      </CardContent>
    </Card>
  )
}

export default App
