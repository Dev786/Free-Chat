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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
const user_schema_1 = require("../Schemas/user.schema");
const crypto = require("crypto");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async register(registerRequest) {
        console.log(registerRequest);
        const emailExist = await this.userModel.findOne({ email: registerRequest.email });
        const usernameExist = await this.userModel.findOne({ username: registerRequest.username });
        if (emailExist || usernameExist) {
            return {
                success: false,
                message: emailExist ? "Email Already Exists" : 'Username already Exists'
            };
        }
        registerRequest.password = crypto.createHmac('sha256', registerRequest.password).digest('hex');
        this.userModel.create(registerRequest);
        return {
            success: true,
            message: this.authService.createToken({ email: registerRequest.email, password: registerRequest.password })
        };
    }
    async login(loginRequest) {
        const user = await this.authService.validate(loginRequest);
        console.log(user);
        if (user) {
            this.userModel.updateOne({ email: loginRequest.email }, { online: true });
            return {
                success: true,
                data: await this.authService.createToken(user)
            };
        }
        return {
            success: false,
            message: "User Does not Exist"
        };
    }
    async logout(userId) {
        const update = this.userModel.updateOne({ userId: userId }, { online: false });
        if (update) {
            return {
                success: true,
                data: "Logout Successful"
            };
        }
        return {
            success: false,
            message: "Couldn't logout"
        };
    }
    async getUser(userId) {
        const user = await this.userModel.findOne({ id: userId });
        if (user) {
            return {
                success: true,
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                }
            };
        }
        return {
            success: false,
            message: 'User Does Not Exists'
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map