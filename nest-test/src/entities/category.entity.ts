import { ArticleEntity } from './article.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity/base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({
    length: 100,
    nullable: true,
  })
  name: string;
  @OneToMany(() => ArticleEntity, (article) => article.category)
  articles: ArticleEntity[];
}
