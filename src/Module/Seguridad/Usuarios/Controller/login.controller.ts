import { ConflictException, Controller, Get, Query } from '@nestjs/common';
import { LoginService } from '../Services/login.service';
import { LoginDto } from '../Dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Get()
  async validateLogin(@Query() loginDto: LoginDto) {
    try {
      return await this.loginService.validateUserLogin(loginDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
