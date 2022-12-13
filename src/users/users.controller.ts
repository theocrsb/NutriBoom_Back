import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //all persons
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      createUserDto.firstname &&
      createUserDto.lastname &&
      createUserDto.age &&
      createUserDto.email &&
      createUserDto.gender &&
      createUserDto.height &&
      createUserDto.weight &&
      createUserDto.password &&
      createUserDto.ratio
    ) {
      return this.usersService.create(createUserDto);
    } else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }
  //ADMIN
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //USER avec GetUser
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //USER avec GetUser
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //USER avec GetUser
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
