"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const connection_schema_1 = require("../../Schemas/connection.schema");
const user_schema_1 = require("../../Schemas/user.schema");
let ConnectionService = class ConnectionService {
    constructor(connectionModel, userModel) {
        this.connectionModel = connectionModel;
        this.userModel = userModel;
    }
    async sendRequest(from, to) {
        return {
            success: true,
            data: await this.connectionModel.create({
                from,
                to
            })
        };
    }
    async cancelRequest(connectionId) {
        return {
            success: true,
            data: await this.connectionModel.updateOne({ id: connectionId }, { status: "CANCELLED" })
        };
    }
    async acceptRequest(connectionId) {
        return {
            success: true,
            data: await this.connectionModel.updateOne({ id: connectionId }, { status: "ACCEPTED" })
        };
    }
    async declineRequest(connectionId) {
        return {
            success: true,
            data: await this.connectionModel.updateOne({ id: connectionId }, { status: "DECLINED" })
        };
    }
    async getConnetionRequestsForMe(userId, limit, page) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.connectionModel.find({ to: userId, status: 'PENDING' }).limit(limit).skip(offset).sort({ createdAt: 'desc' })
        };
    }
    async getRequestISent(userId, limit, page) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.connectionModel.find({ from: userId, status: 'PENDING' }).limit(limit).skip(offset).sort({ createdAt: 'desc' })
        };
    }
    async getMyContacts(userId) {
        const friends = await this.connectionModel.find({
            $or: [
                { from: userId, status: 'ACCEPTED' },
                { to: userId, status: 'ACCEPTED' }
            ]
        });
        const friendIds = friends.map(friend => {
            return friend.from == userId ? friend.to : friend.from;
        });
        const friendsObject = await this.userModel.find({
            '_id': {
                $in: friendIds
            }
        });
        console.log(friendsObject);
        return {
            success: true,
            data: friendsObject.map(friend => {
                return {
                    username: friend.username,
                    id: friend.id,
                    firstName: friend.firstName,
                    lastName: friend.lastName
                };
            })
        };
    }
};
ConnectionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(connection_schema_1.Connection.name)),
    __param(1, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ConnectionService);
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map