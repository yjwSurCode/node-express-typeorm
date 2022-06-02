import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO 默认为空 不可以null 数据库操作的时候不可以不传递   默认varchar-utf8mb4
  @Column({ type: "varchar", charset: "utf8" })
  userId: string;

  @Column({
    default: null,
  })
  time: string;

  @Column({
    default: null,
  })
  status: string;
}
