import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { AuthRepository } from '../../src/auth/repository/auth-repository';
import { mockAuthRepositoryStub } from './mock/auth-repository.stub';

describe('AuthService', () => {
  let service: AuthService;
  let repository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, JwtService],
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepositoryStub,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
