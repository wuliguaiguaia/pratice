import { IsNotEmpty } from 'class-validator';

// data transfer object
export class UserDto{
  readonly name: string;
  readonly age: number;
  readonly sex?: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '用户年龄不能为空',
  })
  age: number;

  @IsNotEmpty({
    message: '用户性别不能为空',
  })
  sex: string
}


export class QueryUserDto{

}


export class UpdateUserDto{

}

export class DeleteUserDto {
  
}