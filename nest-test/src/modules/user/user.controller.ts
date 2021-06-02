import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户列表
   */
  @Get()
  async getUserList(@Body() userDto: QueryUserDto) {
    return await this.userService.getUserList(userDto);
  }

  /**
   * 手机号查找用户
   */
  @Get(':mobile')
  async getUserByMobile(@Param('mobile') mobile: string) {
    return await this.userService.getUserByMobile(mobile);
  }

  /**
   * 增加用户
   */
  @Post()
  async addUser(@Body() userDto: CreateUserDto) {
    return await this.userService.addUser(userDto);
  }
  /**
   * 更新用户
   */
  @Put()
  async updateUser(@Body() userDto: UpdateUserDto) {
    return await this.userService.updateUser(userDto);
  }

  /**
   * 删除用户
   */
  @Delete()
  async removeUser(@Body() id: number) {
    return await this.userService.removeUser(id);
  }
}
