import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.usersService.signup(user)
  }
}
