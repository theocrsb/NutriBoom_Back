import { Module } from '@nestjs/common';
import { MailtoService } from './mailto.service';
import { MailtoController } from './mailto.controller';
import { MailTo } from './entities/mailto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MailTo]), AuthModule],
  controllers: [MailtoController],
  providers: [MailtoService],
})
export class MailtoModule {}
