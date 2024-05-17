import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ["src/entities/*.{ts,js}"],
  synchronize: true,
});
