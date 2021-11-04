import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginService } from '../login/login.service';
import { PoliciesService } from '../policies/policies.service';
import { ClientsService } from './clients.service';
import { ClientsDto } from './dto/clients.dt';
@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly loginService: LoginService,
    private readonly policiesService: PoliciesService,
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
    description: 'Return a list of clients',
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
              params.name,
              clients.length,
            ),
          );
      }
      return res
        .status(200)
        .json(
          clientsPaginated(
            clients,
            params.limit,
            params.page,
            params.name,
            clients.length,
          ),
        );
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized error',
      });
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get client information.',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return information about the requested client',
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
  async getClient(@Req() req, @Res() res, @Param('id') id: string) {
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
        const clientResult = clients.filter((client) => client.id === id);
        return res.status(200).json(clientResult[0]);
      }
      const clientResult = clients.filter((client) => client.id === id);
      return res.status(200).json(clientResult[0]);
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized error',
      });
    }
  }

  @Get(':id/policies')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get client policies.',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return polcicies related to the requested client',
    schema: {
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
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized error',
    schema: {
      type: 'object',
      properties: { code: { type: 'number' }, message: { type: 'string' } },
    },
  })
  async getClientPolicies(@Req() req, @Res() res, @Param('id') id: string) {
    //
    // PENDING FOR USE POLICIES SERVICE AND FILTER BY CLIENT ID
    //
    const token = req.headers.authorization;
    if (token !== undefined) {
      const policies = await this.policiesService.getPolicies(token);
      if (policies === undefined) {
        // This part could be improved by using a refresh token in authorization server.
        // Instead of using a new token, the client could use the refresh token to get the information without issues.
        const loginData = {
          username: 'dare',
          password: 's3cr3t',
        };
        const user = await this.loginService.login(loginData);
        const policies = await this.policiesService.getPolicies(
          `Bearer ${user.token}`,
        );
        const policyResult = policies.filter(
          (policy) => policy.clientId === id,
        );
        return res.status(200).json(policyResult[0]);
      }
      const policyResult = policies.filter((policy) => policy.clientId === id);
      return res.status(200).json(policyResult[0]);
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized error',
      });
    }
  }
}

const clientsPaginated = (
  clients: any,
  limit = 10,
  page = 1,
  name = '',
  total: number,
) => {
  if (name !== '') {
    clients = clients.filter((client) =>
      client.name.toLowerCase().includes(name.toLowerCase()),
    );
  }
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
