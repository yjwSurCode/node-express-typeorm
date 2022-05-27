import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//！！！！！默认都不可以是null     varchar 默认长度255
export enum UserRole {
  ADMIN = "-1",
  EDITOR = "0",
  GHOST = "1",
  Pn = "2",
}

export enum StatusRole {
  ADMIN = "1",
  EDITOR = "2",
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  order_no: string;

  @Column("int")
  good_id: number;

  @Column("int")
  user_id: number;

  // "string" | "number" | "bigint" | "boolean" | "enum" | "simple-enum" | "set" | "hstore" | "simple-array" | "simple-json" | "int2" | "integer" | "int4" | "int8" | "int64" | "unsigned big int" |
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  status: UserRole;

  @Column({
    type: "enum",
    enum: StatusRole,
    default: null,
  })
  order_type: StatusRole;

  @Column({
    length: 111,
  })
  scekill_id: string;

  @Column("datetime")
  created_at: string;

  @Column("datetime")
  updated_at: string;
}
