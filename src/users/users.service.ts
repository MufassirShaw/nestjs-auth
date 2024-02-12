import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(user: FilterQuery<User>) {
    return this.userModel.findOne(user).exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
