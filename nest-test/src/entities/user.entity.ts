/**
 * 用户表实体
 */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'user' })
export default class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;
}
