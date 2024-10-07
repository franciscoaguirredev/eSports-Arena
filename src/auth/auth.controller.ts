import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto  } from './dto';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('register')
  create(@Body()registerUserDto:CreatePlayerDto){
    return this.authService.register(registerUserDto)
  }

  @Post('login')
  loginUser(@Body()loginUserDto:loginUserDto){
    return this.authService.login(loginUserDto)
  }
}