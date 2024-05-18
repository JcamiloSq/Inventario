import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { LoginService } from '../Services/login.service';
import { LoginDto } from '../Dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  async validateLogin(@Body() loginDto: LoginDto) {
    try {
      return await this.loginService.validateUserLogin(loginDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
