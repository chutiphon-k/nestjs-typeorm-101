import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

import { UserEntity } from '../../databases/entities';

export class UpdateDto implements Partial<UserEntity> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 20)
  displayName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 20)
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 20)
  password?: string;
}
