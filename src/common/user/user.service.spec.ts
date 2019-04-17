import { Test, TestingModule } from '@nestjs/testing';

import { UserTokenService } from './token/user-token.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [UserTokenService, UserService],
        }).compile();
    });

    describe('userToken', () => {
        it('should return null', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.userToken("demo", "demo")).toBeNull();
        });
    });

    describe('userToken', () => {
        it('should return UserToken', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.userToken("user@user.ru", "87654321").token).toBeDefined();
        });
    });

    describe('userToken', () => {
        it('should have token: String of length 32', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.userToken("user@user.ru", "87654321").token.length).toEqual(32);
        });
    });
});

