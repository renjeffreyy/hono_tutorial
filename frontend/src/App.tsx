import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

import { useQuery } from "@tanstack/react-query";

import { api } from "./lib/api";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });


  if (error) return "An error has occured" + error.message;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total ammount spent</CardDescription>
      </CardHeader>
      <CardContent>{ isPending ? "..." : data.total}</CardContent>
    </Card>
  );
}

export default App;
