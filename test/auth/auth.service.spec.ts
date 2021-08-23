import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { newUser } from '../../test/user/mock/user.mock';
import { AuthService } from '../../src/auth/auth.service';
import { AuthRepository } from '../../src/auth/repository/auth-repository';
import { mockAuthRepositoryStub } from './mock/auth-repository.stub';

describe('AuthService', () => {
  let service: AuthService;
  let repository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepositoryStub,
        },
        JwtService, {
            provide: JwtService,
            useValue: {
                sign: jest.fn().mockResolvedValue('token.mock')
            }
        }
    ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail to create new user', async () => {
    await expect(service.register(newUser)).resolves.toThrow;
  });

  it('should login user', async() =>{
      await expect (service.login(newUser)).toBeDefined();
  })

  it ('should validate user', async () => {
    const payload = newUser.email
    const payload2 = newUser.password
    await expect (service.validateUser(payload,payload2)).rejects.toThrow;
  })
});

