import { Controller, Get, HttpCode, Query, Req, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginService } from '../login/login.service';
import { ClientsService } from './clients.service';
import { ClientsDto } from './dto/clients.dt';
@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly loginService: LoginService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get the list of clients details paginated and limited to 10 elements by default. This API endpoint access also an optional filter query to filter by client name.',
    description:
      'Can be accessed by client with role user (it will retrieve its own client details as only element of the list) and admin (it will retrieve all the clients list)',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description:
      'Return a valid Bearer access token for the valid client_credentials provided. The token has a time to live equal to expires_in',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
        policies: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            amountInsured: {
              type: 'string',
            },
            inceptionDate: {
              type: 'string',
            },
          },
        },
      },
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
  async getClients(@Query() params: ClientsDto, @Req() req, @Res() res) {
    const token = req.headers.authorization;
    if (token !== undefined) {
      const clients = await this.clientsService.getClients(token);

      if (clients === undefined) {
        // This part could be improved by using a refresh token in authorization server.
        // Instead of using a new token, the client could use the refresh token to get the information without issues.
        const loginData = {
          username: 'dare',
          password: 's3cr3t',
        };
        const user = await this.loginService.login(loginData);
        const clients = await this.clientsService.getClients(
          `Bearer ${user.token}`,
        );
        return res
          .status(200)
          .json(
            clientsPaginated(
              clients,
              params.limit,
              params.page,
              clients.length,
            ),
          );
      }
      return res
        .status(200)
        .json(
          clientsPaginated(clients, params.limit, params.page, clients.length),
        );
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized error',
      });
    }
  }

  @Get('/:id')
  getClient(id: string) {
    // return this.clientsService.getClient(id);
  }

  @Get('/:id/policies')
  getClientPolicies(id: string) {
    // return this.clientsService.getClientPolicies(id);
  }
}

const clientsPaginated = (
  clients: any,
  limit = 10,
  page = 1,
  total: number,
) => {
  const clientsPaginated = chunk(clients, limit);
  const res = {
    page: page,
    limit: limit,
    total: total,
    pages: clientsPaginated.length,
    clients: clientsPaginated[page - 1],
  };
  return res;
};

const chunk = (json: any, size: number) => {
  const result = [];
  while (json.length) {
    result.push(json.splice(0, size));
  }

  return result;
};
