import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import { hashSync as bcryptHasSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(user: UserDto) {
    user.id = uuidv4();
    user.password = bcryptHasSync(user.password, 10);
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
