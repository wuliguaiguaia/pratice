/**
 * 用户实体
 */

import { Entity, Column, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { BaseEntity } from './base-entity/base.entity';

@Entity('user')
export class UserInfoEntity extends BaseEntity {
  // js类型推断：number将被转换为integer，string将转换为varchar，boolean转换为bool等
  // or 隐式指定列类型来使用数据库支持的任何列类型

  @Column({
    nullable: false,
    length: 100,
  })
  name: string;

  @Column({
    nullable: false,
  })
  mobile: string;

  @Column({
    nullable: false,
  })
  role: number;

  @OneToMany(() => ArticleEntity, (article) => article.user)
  // joinColumn？？
  articles: ArticleEntity[];
}
