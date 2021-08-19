import {registerAuthDtoMock, userAuthModelMock} from "./auth.mock"

export const mockAuthRepositoryStub = {
    create: jest.fn().mockReturnValue(userAuthModelMock),
    findOne: jest.fn().mockReturnValue(userAuthModelMock),
    register: jest.fn().mockReturnValue(registerAuthDtoMock),
    login: jest.fn().mockReturnValue(userAuthModelMock)
};