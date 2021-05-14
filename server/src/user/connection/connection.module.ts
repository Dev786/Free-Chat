import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from 'src/Schemas/connection.schema';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Connection.name,
      schema: ConnectionSchema
    },
    {
      name: User.name,
      schema: UserSchema
    }]),

  ],
  controllers: [ConnectionController],
  providers: [ConnectionService]
})
export class ConnectionModule { }
