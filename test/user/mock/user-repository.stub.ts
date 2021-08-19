import { userModelMock } from "./user.mock";


export const mockUserRepositoryStub = {
    create: jest.fn().mockReturnValue(userModelMock),
    findOne: jest.fn().mockReturnValue(userModelMock)
};