//criar usuario,ativar usuario
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import User from '../models/user.model';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly model: Model<User>) { }

    async create(data: User): Promise<any> {
        const User = new this.model(data);
        return await User.save();
    }

    async find(id_user: String): Promise<User[]> {
        return await this.model.find({ _id: id_user })
            .populate('name')
            .exec();
    }


    async update(id_user: String, data: User): Promise<User> {
        return this.model.findOneAndUpdate({ _id: id_user }, data);
    }

    async authenticate(email: String, password: String): Promise<any> {
        const User = await this.model.findOne({ email: email, password: password })
            .exec();
        return User;
    }

}