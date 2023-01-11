import  jwt_decoded  from 'jwt-decode';
import { JwtService } from '@nestjs/jwt';
import { NewPasswordDto } from './dto/new-password-user.dto';
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
import { UpdateRoleDto } from './dto/update-role.dto';
import { VerifUserDto } from './dto/verif-user.dto';
import * as dotenv from  "dotenv"
dotenv.config({ path: '.env' });


export interface TokenDecoded{
email: string;
id:string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService :JwtService) {}

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
@Post ('/reset/password')
  findOneByEmail(@Body() verifUserDto: VerifUserDto, ){
    if (verifUserDto.email){
      return this.usersService.findOneByEmail(verifUserDto.email)
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
  // @UseGuards(AdminGuard)
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

  // update role d'un user
  @Patch(':id/admin')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard())
  updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateRole(id, updateRoleDto, updateUserDto);
  }

  @Patch('/reset/password')
  updateForgottedPassword(
    @Body() newPasswordDto: NewPasswordDto
  ) {
    try {
      this.jwtService.verify(newPasswordDto.token);
const tokenDecoded: TokenDecoded = jwt_decoded(newPasswordDto.token);
console.log('le token décode', tokenDecoded.id);
return this.usersService.updateForgottedPassword(
  newPasswordDto,
  tokenDecoded.id,
)
    } catch (error) {
      console.log("erreur forgotted password",error)
      return error
    }
  }

  //USER avec GetUser
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  
}
