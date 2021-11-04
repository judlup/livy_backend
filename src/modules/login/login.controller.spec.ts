import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('Should return true if object returned contains type value', async () => {
    expect(
      await controller.login({ username: 'dare', password: 's3cr3t' }),
    ).toMatchObject({ type: 'Bearer' });
  });

  it('Should return true if object returned contains token property', async () => {
    expect(
      await controller.login({ username: 'dare', password: 's3cr3t' }),
    ).toHaveProperty('token');
  });
});
