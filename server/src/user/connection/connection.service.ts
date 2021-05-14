import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection, ConnectionDocument } from 'src/Schemas/connection.schema';
import { User, UserDocument } from 'src/Schemas/user.schema';

@Injectable()
export class ConnectionService {
    constructor(
        @InjectModel(Connection.name) private readonly connectionModel: Model<ConnectionDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {

    }

    async sendRequest(from: string, to: string) {
        return {
            success: true,
            data: await this.connectionModel.create(
                {
                    from,
                    to
                }
            )
        }
    }

    async cancelRequest(connectionId: string) {
        return {
            success: true,
            data: await this.connectionModel.updateOne(
                { id: connectionId },
                { status: "CANCELLED" }
            )
        }
    }


    async acceptRequest(connectionId: string) {
        return {
            success: true,
            data: await this.connectionModel.updateOne(
                { id: connectionId },
                { status: "ACCEPTED" }
            )
        }
    }

    async declineRequest(connectionId: string) {
        return {
            success: true,
            data: await this.connectionModel.updateOne(
                { id: connectionId },
                { status: "DECLINED" }
            )
        }
    }

    async getConnetionRequestsForMe(userId: string, limit: number, page: number) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.connectionModel.find({ to: userId, status: 'PENDING' }).limit(limit).skip(offset).sort({ createdAt: 'desc' })
        }
    }

    async getRequestISent(userId: string, limit: number, page: number) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.connectionModel.find({ from: userId, status: 'PENDING' }).limit(limit).skip(offset).sort({ createdAt: 'desc' })
        }
    }

    async getMyContacts(userId: string) {
        const friends = await this.connectionModel.find({
            $or: [
                { from: userId, status: 'ACCEPTED' },
                { to: userId, status: 'ACCEPTED' }
            ]
        })

  
        const friendIds: string[] = friends.map(friend => {
            return friend.from == userId ? friend.to : friend.from
        });

        const friendsObject = await this.userModel.find({
            '_id': {
                $in: friendIds
            }
        });
        console.log(friendsObject)
        return {
            success: true,
            data: friendsObject.map(friend => {
                return {
                    username: friend.username,
                    id: friend.id,
                    firstName: friend.firstName,
                    lastName: friend.lastName
                }
            })
        }
    }
}
