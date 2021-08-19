import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../src/user/user-repository/user.repository';
import { UsersService } from '../../src/user/user.service';
import { mockUserRepositoryStub } from './mock/user-repository.stub';
import { newUser, userModelMock } from './mock/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepositoryStub,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail to create new user', async () => {
    const newUserWithIncorrectEmail = { ...newUser, email: 'email!email.com' };
    await expect(service.create(newUserWithIncorrectEmail)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should find user', async () => {
    const findNewUser = await service.findOne('user@email.com');
    expect(findNewUser).toEqual(userModelMock);
  });
});
