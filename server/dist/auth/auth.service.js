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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../Schemas/user.schema");
const login_request_dto_1 = require("../user/DTO/login.request.dto");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
let AuthService = class AuthService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    async validate(loginRequest) {
        const user = await this.userModel.findOne({
            email: loginRequest.email,
            password: loginRequest.password
        });
        if (user) {
            return user;
        }
        return null;
    }
    async createToken(user) {
        return {
            accessToken: jwt.sign({
                userId: user.id,
            }, this.configService.get('JWT_SECRET_KEY'))
        };
    }
    async validateUserId(userId) {
        const user = await this.userModel.findOne({
            _id: userId,
        });
        if (user) {
            return true;
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map