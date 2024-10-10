import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { loginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Player } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { handleError, handleResponse } from 'src/common/utils/response.util';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Player) private readonly playerRepository:Repository<Player>,
        private readonly jwtService:JwtService,
        private readonly playerService: PlayersService
    ){}

    async register(createPlayer :CreatePlayerDto){
        try {
          const findUser = await this.playerRepository.findOne({where: {email:createPlayer.email}})
          if(findUser){
            return "Email alredy exists"
          }
          const player = await this.playerService.create(createPlayer)

          delete player.password

          const payload = {
            name:createPlayer.name,
            email: createPlayer.email,
            id: player.id
          }

          const token = this.getJwtToken(payload)
            const data = {...player,token}
          return handleResponse(HttpStatus.CREATED,'Player created successfully', data)
        } catch (error) {
          handleError(error, 'Failed to create player');
        }
    };

    async login(loginUserDto:loginUserDto){
        const {password, email} = loginUserDto

        const player = await this.playerRepository.findOne({where:{email}, select: {email:true, password:true,}})
         console.log(player)
        if(!player || !bcrypt.compareSync(password, player.password)) throw new UnauthorizedException('Credentials are not valid')

        delete player.password
        const payload = {
            email:player.email,
            id: player.id
          }    

        return {
            ...player,
            token:this.getJwtToken(payload)
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign(payload);
        return token
    }

}