import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  QueryCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly cateogoryService: CategoryService) {}

  /**
   * 获取分类列表
   */
  @Get()
  async getCategoryList(@Query() categoryDto: QueryCategoryDto) {
    return await this.cateogoryService.getCategoryList(categoryDto);
  }

  /**
   * 增加分类
   */

  @Post()
  async addCategory(@Body() categoryDto: CreateCategoryDto) {
    return await this.cateogoryService.addCategory(categoryDto);
  }

  /**
   * 更新分类
   */
  @Put()
  async updateUser(@Body() categoryDto: UpdateCategoryDto) {
    return await this.cateogoryService.updateCategory(categoryDto);
  }

  /**
   * 删除分类
   */
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return await this.cateogoryService.removeCategory(+id);
  }
}
