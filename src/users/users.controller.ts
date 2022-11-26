import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Query('userId') userId: any, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(userId, createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Query('userId') userId: any,
    @Param('id') id: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, id, updateUserDto);
  }

  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: any) {
    return this.usersService.remove(userId, id);
  }
}
