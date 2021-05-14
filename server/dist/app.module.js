"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const config_module_1 = require("./config/config.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("./config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const user_controller_1 = require("./user/user.controller");
const gateway_middleware_1 = require("./auth/gateway.middleware");
const message_module_1 = require("./message/message.module");
const app_gateway_1 = require("./app.gateway");
const kafka_module_1 = require("./kafka/kafka.module");
const websocket_module_1 = require("./websocket/websocket.module");
const connection_controller_1 = require("./user/connection/connection.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(gateway_middleware_1.gatewayMiddleware)
            .exclude({ path: '/user/login', method: common_1.RequestMethod.POST }, { path: '/user/register', method: common_1.RequestMethod.POST })
            .forRoutes(user_controller_1.UserController, connection_controller_1.ConnectionController)
            .apply();
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.ConfigModule,
            websocket_module_1.WebsocketModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            message_module_1.MessageModule,
            kafka_module_1.KafkaModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map