import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserService } from './common/user/user.service';
import { UserTokenService } from './common/user/token/user-token.service';

import * as request from 'supertest';
import { UserController } from './versions/v1/controllers/user.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController, UserController],
      providers: [AppService, UserService, UserTokenService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('userService', () => {
    it('should return null', () => {
      const userService = app.get<UserService>(UserService);
      expect(userService.userToken("demo", "demo")).toBeNull();
    });
  });

  describe('userService', () => {
    it('should return UserToken', () => {
      const userService = app.get<UserService>(UserService);
      expect(userService.userToken("user@user.ru", "87654321").token).toBeDefined();
    });
  });

  describe('userService', () => {
    it('should have token: String of length 32', () => {
      const userService = app.get<UserService>(UserService);
      expect(userService.userToken("user@user.ru", "87654321").token.length).toEqual(32);
    });
  });

  describe('userController', () => {
    it('/v1/user/login should return 401 Unauthorized', () => {
      const server = "http://127.0.0.1:3000";
      const badUser = {email: "demo", password: "demo"}
      return request(server)
      .post('/v1/user/login')
      .send(badUser)
      .expect(401)
      .expect({ statusCode: 401, error: 'Unauthorized' });
    });
  });

  describe('userController', () => {
    it('/v1/user/login should return 200 OK', () => {
      const server = "http://127.0.0.1:3000";
      const goodUser = {email: "user@user.ru", password: "87654321"}
      return request(server)
      .post('/v1/user/login')
      .send(goodUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(typeof response.body.token).toBe("string");
        expect(response.body.token.length).toBe(32);
      });
    });
  });
});

