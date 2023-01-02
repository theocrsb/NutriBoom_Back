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
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

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
  @UseGuards(AuthGuard(), AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  //USER avec GetUser
  @Get(':id')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //USER avec GetUser
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //USER avec GetUser
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
