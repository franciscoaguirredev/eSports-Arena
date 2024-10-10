import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { handleError, handleResponse } from 'src/common/utils/response.util';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayer: CreatePlayerDto): Promise<Player> {
    try {
      const {password, ...playerData} = createPlayer
      const player = await this.playerRepository.create({
        ...playerData,
        password: bcrypt.hashSync(password, 10)
      })
      return await this.playerRepository.save(player);
    } catch (error) {
      handleError(error, 'Failed to create Player')
    }

  }

  async findAll(): Promise<any> {
    try {
      const data = await this.playerRepository.find();
      return handleResponse(HttpStatus.OK,'Players found successfully', data)
    } catch (error) {
      handleError(error, 'Failed to find players')
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const player = await this.playerRepository.findOne({ where: { id } });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      return handleResponse(HttpStatus.OK, 'Player found successfully',player)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find Player')
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<any> {
    try {
      const player = await this.playerRepository.findOne({ where: { id } });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      Object.assign(player, updatePlayerDto);
      const updatedPlayer = await this.playerRepository.save(player);
      return handleResponse(HttpStatus.OK,'Player updated successfully',updatedPlayer )
    } catch (error) {
            if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to update Player')
    }
  }

  async remove(id: number): Promise<any> {
    const player = await this.playerRepository.findOne({ where: { id } });
    await this.playerRepository.remove(player);
    return handleResponse(null, 'Player deleted successfully', HttpStatus.OK);
  }
}
