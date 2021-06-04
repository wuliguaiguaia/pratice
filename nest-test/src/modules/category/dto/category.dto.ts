import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: '分类名不能为空',
  })
  name: string;
}

export class QueryCategoryDto {
  @IsNotEmpty({
    message: '页码不能为空',
  })
  page: number;

  prepage: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  id: number;
}
