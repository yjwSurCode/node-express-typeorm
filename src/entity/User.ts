import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO 默认为空 数据库操作的时候可以不传递
  @Column()
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
}
