import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: '文章名不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '类别不能为空',
  })
  category: number[];

  keywords: string;
  content: string;
}

export class UpdateArticleDto extends CreateArticleDto {
  @IsNotEmpty({
    message: '文章id不能为空',
  })
  id: number;
}

export class QueryArticleDto {
  @IsNotEmpty({
    message: '页码不能为空',
  })
  page: number;

  prepage: number;
}
