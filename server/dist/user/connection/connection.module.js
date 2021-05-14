"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const connection_schema_1 = require("../../Schemas/connection.schema");
const user_schema_1 = require("../../Schemas/user.schema");
const connection_controller_1 = require("./connection.controller");
const connection_service_1 = require("./connection.service");
let ConnectionModule = class ConnectionModule {
};
ConnectionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: connection_schema_1.Connection.name,
                    schema: connection_schema_1.ConnectionSchema
                },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema
                }]),
        ],
        controllers: [connection_controller_1.ConnectionController],
        providers: [connection_service_1.ConnectionService]
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;
//# sourceMappingURL=connection.module.js.map