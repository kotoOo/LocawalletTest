import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../../common/user/user.service';
import { User } from '../../../common/user/user';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  login(@Body() user: User, @Res() res: Response) {
    const userToken = this.userService.userToken(user.email, user.password);
    if (userToken) {
      res.status(200).json({token: userToken.token});
    } else { 
      res.status(401).json({
        statusCode: 401,
        error: "Unauthorized"
      });
    }
  }
}
