import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "green_step",
  password: "green_step",
  database: "green_step_db",
  //   username: process.env.USERNAME,
  //   password: process.env.PASSWORD,
  //   database: process.env.DATABASE,
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
