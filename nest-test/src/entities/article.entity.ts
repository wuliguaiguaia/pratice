/**
 * 文章实体
 */

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { MysqlDataType } from './../common/constants/database/mysql';
import { UserInfoEntity } from './user.entity';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from './base-entity/base.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column({
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    length: 100,
  })
  keywords: string;

  @ManyToMany(() => CategoryEntity, (category) => category.id)
  @JoinTable()
  category: CategoryEntity[];

  @Column({
    type: MysqlDataType.LONGTEXT,
  })
  content: string;

  @ManyToOne(() => UserInfoEntity, (user) => user.articles)
  @JoinColumn()
  user: UserInfoEntity;
}
