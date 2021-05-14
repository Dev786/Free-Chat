import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './DTO/login.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    getUser(@Query('id') userId: string) {
        return this.userService.getUser(userId);
    }

    @Get('/logout')
    logout(@Query('userId') userId) {
        return this.userService.logout(userId);
    }

    @Post('/register')
    register(@Body() request: RegisterDTO) {
        return this.userService.register(request);
    }

    @Post('/login')
    login(@Body() request: LoginDTO) {
        return this.userService.login(request);
    }

}
