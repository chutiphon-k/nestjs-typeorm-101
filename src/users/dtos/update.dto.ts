import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

import { UserEntity } from '../../databases/entities';

export class UpdateDto implements Partial<UserEntity> {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  displayName?: string | null;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username?: string | null;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password?: string | null;
}
