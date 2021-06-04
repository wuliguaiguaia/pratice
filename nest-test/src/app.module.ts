import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import * as config from 'config';

@Global() // 全局模块
@Module({
  imports: [
    // 数据库连接配置
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: config.get('db.host'),
        port: Number(config.get('db.port')),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        timezone: 'UTC',
        charset: 'utf8mb4',
        entities: ['dist/**/*.entity{.ts,.js}'],
        // 生产和测试环境中要设置成 false， 防止字段改动导致内容丢失，本地开发可以设置成 true
        synchronize: config.get('db.synchronize'), // true: 每次运行应用程序时实体都将与数据库同步
        logging: true,
      }),
    }),
    UserModule,
    ArticleModule,
    CategoryModule,
  ],
})
export class AppModule {}
