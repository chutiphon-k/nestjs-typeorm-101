import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';

import { UserEntity } from '../databases/entities';
import { FindAllQuery } from './queries';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateDto, CreateDto, LoginDto } from './dtos';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly _usersService: UsersService;

  constructor(usersService: UsersService) {
    this._usersService = usersService;
  }

  @Get()
  findAll(@Query() query: FindAllQuery): Promise<UserEntity[]> {
    return this._usersService.findAll(query);
  }

  @Get('/:userId')
  findById(@Param('userId') userId: string): Promise<UserEntity> {
    return this._usersService.findById(userId);
  }

  @Patch('/:userId')
  update(
    @Param('userId') userId: string,
    @Body() body: UpdateDto = {},
  ): Promise<UserEntity> {
    return this._usersService.update(userId, body);
  }

  @Delete('/:userId')
  remove(@Param('userId') userId: string): Promise<UserEntity> {
    return this._usersService.remove(userId);
  }

  @Post('/')
  create(@Body() body: CreateDto): Promise<UserEntity> {
    return this._usersService.create(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto): Promise<UserEntity> {
    return this._usersService.login(body);
  }
}
