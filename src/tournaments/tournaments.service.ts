import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { handleError, handleResponse } from 'src/common/utils/response.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { IHandleError, IHandleRespose } from 'src/common/utils/response.interface';
import { log } from 'console';

@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>
  ){}

  async create(createTournamentDto: CreateTournamentDto): Promise<IHandleRespose | IHandleError> {
    try {    
      const newTournament = this.tournamentRepository.create(createTournamentDto);
      const tournament = await this.tournamentRepository.save(newTournament);
      return handleResponse(HttpStatus.OK,'Tournamet created successfully', tournament)
    } catch (error) {
      handleError(error, 'Failed to create Tournaments')
    }
  }

  async findAll(): Promise<IHandleRespose | IHandleError> {
    try {
      const data =  await this.tournamentRepository.find({
        relations: ['participants', 'matches'], 
      });
      if (!data) {
        throw new NotFoundException(`Torunamets not found`);
      }
      return handleResponse(HttpStatus.OK, 'Tournamets found successfully', data)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find Tournaments')
    }
  }

  async findOne(id: number): Promise<IHandleRespose | IHandleError>{
    try {
      const data = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['participants', 'matches'],
      });
      if (!data) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }
      return handleResponse(HttpStatus.OK,'Tournamet found successfully', data)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find Tournaments')
    }
    }
  }






  // create(createTournamentDto: CreateTournamentDto) {
  //   return 'This action adds a new tournament';
  // }

  // findAll() {
  //   return `This action returns all tournaments`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} tournament`;
  // }

  // update(id: number, updateTournamentDto: UpdateTournamentDto) {
  //   return `This action updates a #${id} tournament`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tournament`;
  // }
// }
