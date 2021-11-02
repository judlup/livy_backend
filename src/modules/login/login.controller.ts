import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { ILoginResponse } from './interfaces/ILoginResponse';
import { LoginService } from './login.service';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Retrieve the auth token' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description:
      'Return a valid Bearer access token for the valid client_credentials provided. The token has a time to live equal to expires_in',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        expires_in: {
          type: 'number',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      type: 'object',
      properties: { code: { type: 'number' }, message: { type: 'string' } },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized error',
    schema: {
      type: 'object',
      properties: { code: { type: 'number' }, message: { type: 'string' } },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const response: ILoginResponse = await this.loginService.login(loginDto);
    return response;
  }
}
