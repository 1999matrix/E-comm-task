import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes";

dotenv.config();
const PORT = process.env.PORT || 8084;
const app: Express = express();

app.use(express.json());


app.use("/api", rootRouter);

export const prisma = new PrismaClient({
    log : ["query"],
})

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => {
    console.log("coonected to database");
  })
  .catch((err: any) => {
    console.log("error in connecting", err);
  });

app.listen(8080, () => {
  console.log("api is running on port 8080");
});
