import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from 'src/config';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    ConnectionModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
