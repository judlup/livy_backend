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
import { PoliciesDto } from './dto/policies.dto';
import { PoliciesService } from './policies.service';

@ApiTags('Policies')
@Controller('policies')
export class PoliciesController {
  constructor(
    private readonly policiesService: PoliciesService,
    private readonly loginService: LoginService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get the list of policies details paginated and limited to 10 elements by default.',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return a list of policies',
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
  async getPolicies(@Query() params: PoliciesDto, @Req() req, @Res() res) {
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
        return res
          .status(200)
          .json(
            policiesPaginated(
              policies,
              params.limit,
              params.page,
              policies.length,
            ),
          );
      }
      return res
        .status(200)
        .json(
          policiesPaginated(
            policies,
            params.limit,
            params.page,
            policies.length,
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
    summary: 'Get policy information.',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return information about the requested policy',
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
  async getPolicy(@Req() req, @Res() res, @Param('id') id: string) {
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
        const policiesResult = policies.filter((policy) => policy.id === id);
        return res.status(200).json(policiesResult[0]);
      }
      const policyResult = policies.filter((policy) => policy.id === id);
      return res.status(200).json(policyResult[0]);
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized error',
      });
    }
  }
}

const policiesPaginated = (
  policies: any,
  limit = 10,
  page = 1,
  total: number,
) => {
  const policiesPaginated = chunk(policies, limit);
  const res = {
    page: page,
    limit: limit,
    total: total,
    pages: policiesPaginated.length,
    policies: policiesPaginated[page - 1],
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
