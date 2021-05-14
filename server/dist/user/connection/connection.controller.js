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
exports.ConnectionController = void 0;
const common_1 = require("@nestjs/common");
const connection_service_1 = require("./connection.service");
let ConnectionController = class ConnectionController {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    sendRequest(sender, receiver) {
        return this.connectionService.sendRequest(sender, receiver);
    }
    acceptRequest(connectionId) {
        return this.connectionService.acceptRequest(connectionId);
    }
    accept(connectionId) {
        return this.connectionService.declineRequest(connectionId);
    }
    decline(connectionId) {
        return this.connectionService.cancelRequest(connectionId);
    }
    getConnectionRequestForMe(userId, limit, page) {
        return this.connectionService.getConnetionRequestsForMe(userId, limit, page);
    }
    getConnectionRequestISent(userId, limit, page) {
        return this.connectionService.getRequestISent(userId, limit, page);
    }
    getMyContacts(userId) {
        console.log(userId);
        return this.connectionService.getMyContacts(userId);
    }
};
__decorate([
    common_1.Post('/request/send/:to'),
    __param(0, common_1.Body('userId')),
    __param(1, common_1.Param('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "sendRequest", null);
__decorate([
    common_1.Put('/request/accept/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "acceptRequest", null);
__decorate([
    common_1.Put('/request/decline/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "accept", null);
__decorate([
    common_1.Put('/request/cancel/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "decline", null);
__decorate([
    common_1.Get('/request/me'),
    __param(0, common_1.Query('userId')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "getConnectionRequestForMe", null);
__decorate([
    common_1.Get('/request/sent/me'),
    __param(0, common_1.Query('userId')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "getConnectionRequestISent", null);
__decorate([
    common_1.Get('/contacts/me'),
    __param(0, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "getMyContacts", null);
ConnectionController = __decorate([
    common_1.Controller('/user/connection'),
    __metadata("design:paramtypes", [connection_service_1.ConnectionService])
], ConnectionController);
exports.ConnectionController = ConnectionController;
//# sourceMappingURL=connection.controller.js.map