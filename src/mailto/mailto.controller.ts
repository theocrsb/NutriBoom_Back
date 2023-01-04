import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailtoService } from './mailto.service';
import { CreateMailtoDto } from './dto/create-mailto.dto';
// import { UpdateMailtoDto } from './dto/update-mailto.dto';

@Controller('mailto')
export class MailtoController {
  constructor(private readonly mailtoService: MailtoService) {}

  @Post()
  create(@Body() createMailtoDto: CreateMailtoDto) {
    return this.mailtoService.create(createMailtoDto);
  }

  @Get()
  findAll() {
    return this.mailtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailtoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMailtoDto: UpdateMailtoDto) {
  //   return this.mailtoService.update(+id, updateMailtoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailtoService.remove(+id);
  }
}
