import { Controller, Post, Put, Body } from "@nestjs/common";
import { UserService } from "../services/user.service";
import User from "../models/user.model";
import { ResultDto } from "../models/result.model";

@Controller('v1/users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('auth')
    async auth(@Body() user: User) {
        try {
            console.log('users-POST-auth');
            const logUser = await this.userService.authenticate(user.email, user.password);
            console.log('Usuário logado: ' + logUser.name);
            return new ResultDto(null, true, { logUser }, null)
        } catch (error) {
            return new ResultDto('Houve um erro', false, [], error)
        }
    }
    @Post('create')
    async create(@Body() user: User) {
        try {
            console.log('users-POST-create');
            const newUser = await this.userService.create(user);
            return new ResultDto('Usuário criado com sucesso!', true, { newUser }, null)
        } catch (error) {
            return new ResultDto('Houve um erro', false, [], error)
        }
    }

    @Put('update')
    async update(@Body() user: User, @Body() _id: String) {
        try {
            console.log('users-PUT-update');
            const updatedUser = await this.userService.update(_id, user);
            return new ResultDto('Usuário atualizado com sucesso!', true, { updatedUser }, null)
        } catch (error) {
            return new ResultDto('Houve um erro', false, [], error)
        }
    }
}
