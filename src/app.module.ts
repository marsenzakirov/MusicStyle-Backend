import { RoleModule } from './user/role/role.module';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
ConfigModule.forRoot();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    TrackModule,
    FileModule,
    UserModule,
    AuthModule,
    RoleModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
  ],
  providers: [],
})
export class AppModule {}
