import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './../../../common/user/user.service';
import { UserTokenService } from './../../../common/user/token/user-token.service';
import { UserToken } from './../../../common/user/token/user-token';
import { User } from './../../../common/user/user';

describe('UserController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, UserTokenService],
        }).compile();
    });

    describe('login', () => {
        it('should pass email, password to UserService.userToken method', () => {
            const userController = app.get<UserController>(UserController);
            const userService = app.get<UserService>(UserService);
            

            jest.spyOn(userService, 'userToken').mockImplementation((login: String, password: String) => {
                expect(login).toBe("demo");
                expect(password).toBe("demoPassword");

                return null;
            });

            expect(userController.login(new User("demo", "demoPassword"), null)).toBe(false);
            //expect(userService.userToken("demo", "demo")).toBeNull();
        });
    });
});

