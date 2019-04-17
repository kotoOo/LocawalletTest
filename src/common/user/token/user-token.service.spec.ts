import { Test, TestingModule } from '@nestjs/testing';

import { UserToken } from './user-token';
import { UserTokenService } from './user-token.service';

describe('UserTokenService', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [UserTokenService],
        }).compile();
    });

    describe('newToken', () => {
        it('should return UserToken', () => {
            const userTokenService = app.get<UserTokenService>(UserTokenService);
            expect(userTokenService.newToken()).toBeInstanceOf(UserToken);
        });

        it('should return UserToken with token: String of length 32', () => {
            const userTokenService = app.get<UserTokenService>(UserTokenService);
            const userToken: UserToken = userTokenService.newToken();
            expect(typeof userToken.token).toBe("string");
            expect(userToken.token.length).toBe(32);
        });

        it('should return different tokens each time', () => {
            const userTokenService = app.get<UserTokenService>(UserTokenService);
            const userToken1: UserToken = userTokenService.newToken();
            const userToken2: UserToken = userTokenService.newToken();

            expect(userToken1.token).not.toBe(userToken2.token);
        });
    });
});

