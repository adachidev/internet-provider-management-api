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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Query('userId') userId: any, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(userId, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Query('userId') userId: any,
    @Param('id') id: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: any) {
    return this.usersService.remove(userId, id);
  }
}
