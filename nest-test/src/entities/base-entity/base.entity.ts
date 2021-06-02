import { MysqlDataType } from './../../common/constants/database/mysql';
/**
 * 表实体基类
 * 嵌入式实体
 */

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// abstract
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: MysqlDataType.TIMESTAMP;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_time: MysqlDataType.TIMESTAMP;

  // @Column({
  //   type: MysqlDataType.TINYINT,
  //   default: 1,
  //   nullable: false,
  //   comment: '是否可用',
  // })
  // is_valid: number;
}
