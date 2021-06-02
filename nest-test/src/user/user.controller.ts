import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async getUserList() {
    console.log(111);
    
    return await this.userService.userList();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    console.log('i000i');
    return await this.userService.findOne(id);
  }

  @Post('')
  async addUser(@Body() userDto: CreateUserDto) {
    return await this.userService.addUser(userDto);
  }
}