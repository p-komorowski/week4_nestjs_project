import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from '../../src/auth/auth.service';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../../src/user/user.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
