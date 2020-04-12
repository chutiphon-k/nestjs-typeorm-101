import { createHash } from 'crypto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserRepository } from '../databases/repositories';
import { FindAllQuery } from './queries';
import { UserEntity } from '../databases/entities';
import { UpdateDto, LoginDto, CreateDto } from './dtos';

@Injectable()
export class UsersService {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  findAll(args: FindAllQuery = {}): Promise<UserEntity[]> {
    return this._userRepository.find({
      take: args.limit,
      skip: args.offset,
    });
  }

  async findById(userId: string): Promise<UserEntity> {
    const user: UserEntity = await this._userRepository.findOne(userId);
    if (!user) throw new NotFoundException('user_not_found');
    return user;
  }

  async update(userId: string, args: UpdateDto = {}): Promise<UserEntity> {
    const { displayName, username, password, ...restArgs } = args;

    if (displayName === null)
      throw new UnprocessableEntityException(
        'displayName should not be equal to null',
      );
    if (username === null)
      throw new UnprocessableEntityException(
        'username should not be equal to null',
      );
    if (password === null)
      throw new UnprocessableEntityException(
        'password should not be equal to null',
      );

    const user: UserEntity = await this.findById(userId);
    const updatedUser: UserEntity = new UserEntity({ ...user, ...restArgs });

    if (username) {
      await this._checkExistUsername(username);
      updatedUser.username = username;
    }
    if (password) updatedUser.password = this._encryptPasssword(password);

    return this._userRepository.save(user);
  }

  async remove(userId: string): Promise<UserEntity> {
    const user: UserEntity = await this.findById(userId);
    await this._userRepository.delete(userId);
    return user;
  }

  async login(args: LoginDto): Promise<UserEntity> {
    const { username, password } = args;

    const user: UserEntity = await this._userRepository.findOne({ username });
    if (!user) throw new BadRequestException('invalid_username');

    const encryptedPasssword: string = this._encryptPasssword(password);
    if (password !== encryptedPasssword)
      throw new BadRequestException('invalid_password');

    return user;
  }

  async create(args: CreateDto): Promise<UserEntity> {
    await this._checkExistUsername(args.username);

    const user: UserEntity = new UserEntity({
      ...args,
      password: this._encryptPasssword(args.password),
    });

    return this._userRepository.save(user);
  }

  private async _checkExistUsername(username: string): Promise<void> {
    const user: UserEntity = await this._userRepository.findOne({ username });
    if (user) throw new BadRequestException('username_already_exist');
  }

  private _encryptPasssword(password: string): string {
    return createHash('md5')
      .update(password)
      .digest('hex');
  }
}
