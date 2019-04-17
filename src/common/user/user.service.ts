import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';
import { UserToken } from './token/user-token';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) {}

  userToken(login: String, password: String): UserToken {
    const a = this.users.filter(user => user.email == login && user.password == password);
    if (!a.length) return null;

    var user = a[0];
    if (!user.token) {
      const randomstring = require("randomstring");
      user.token = new UserToken(randomstring.generate());
    }

    return user.token;
  }
}
