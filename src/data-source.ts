import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Car } from "./entity/Car";
import { Record } from "./entity/Record";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "106.12.154.161",
  port: 3306,
  username: "root",
  password: "your password", //数据库密码 不是服务器密码
  database: "parking",
  synchronize: true,
  logging: false,
  entities: [User, Car, Record],
  migrations: [],
  subscribers: [],
});
