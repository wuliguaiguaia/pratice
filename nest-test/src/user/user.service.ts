import { UserDto } from './dto/user.dto';
import { EntityRepository, Repository } from 'typeorm';
import UserInfoEntity from './../entities/user.entity';

@EntityRepository(UserInfoEntity)
export class UserService extends Repository<UserInfoEntity>{
  async addUser(userDto: UserDto) {
    return await this.save(userDto);
  }

  async findUser(id: string) {
    return await this.findOneOrFail(id)
  }

  async userList() {
    console.log(123123);
    
    return await this.save({name: '1232', age:12, sex:'men'})
  }
}

// forFeature UserInfoEntity
// forRootAsync