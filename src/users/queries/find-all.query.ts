import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAllQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(value => parseInt(value))
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(value => parseInt(value))
  offset?: number;
}
