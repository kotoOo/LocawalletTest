import { Injectable } from '@nestjs/common';
import { UserToken } from './user-token';

@Injectable()
export class UserTokenService {
    public newToken(): UserToken {
        return new UserToken(require("randomstring").generate());
    }
}
