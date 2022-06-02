import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: null,
  })
  villageName: string; //小区名称

  @Column({
    default: null,
  })
  parkimg: string; //车位图片

  @Column({
    default: null,
  })
  starTime: string; //开始时间

  @Column({
    default: null,
  })
  endTime: string; //介绍时间

  // "string" | "number" | "bigint" | "boolean" | "enum" | "simple-enum" | "set" | "hstore" | "simple-array" | "simple-json" | "int2" | "integer" | "int4" | "int8" | "int64" | "unsigned big int" |
  @Column({
    type: "boolean",
    default: true,
  })
  isPut: boolean;

  @Column({
    default: null,
  })
  price: string; //每小时单价

  @Column({
    default: null,
  })
  parkingName: string; //车位名称

  @Column({
    default: null,
  })
  address: string; //导航地址

  @Column({
    default: null,
  })
  userId: string; //用户归属

  @Column({
    default: 3,
  })
  goods: number; //商品剩余
}
