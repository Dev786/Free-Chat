"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const config_1 = require("../config");
const user_schema_1 = require("../Schemas/user.schema");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const connection_module_1 = require("./connection/connection.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema
                }
            ]),
            connection_module_1.ConnectionModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map