import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { ClientsDto } from './dto/clients.dt';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

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
  async getClients(@Query() params: ClientsDto) {
    console.log(params.limit, params.name);
    return await this.clientsService.getClients();
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
