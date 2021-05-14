import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {

}
