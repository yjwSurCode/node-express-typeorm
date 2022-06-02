import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO 默认为空 不可以null 数据库操作的时候不可以不传递   默认varchar-utf8mb4
  @Column({ type: "varchar", charset: "utf8" })
  userId: string;
  // "string" | "number" | "bigint" | "boolean" | "enum" | "simple-enum" | "integer" | "int4" | "int8" | "int64" | "unsigned big int" |
  // {
  //   type: "string",
  //   default: "***",
  // }
  @Column({
    default: null,
  })
  phone: string;

  @Column({
    default: null,
  })
  userName: string;

  @Column({
    default: null,
  })
  time: string;

  @Column({
    default: null,
  })
  goods: string;
}
