import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

export class CreateAuthDto extends CreateUserDto  {

  @ApiProperty({
    description: '',
    minLength: 2,
    maxLength: 30,
    type: String,
    example: '',
  })
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiProperty({
    description: '',
    minLength: 2,
    maxLength: 30,
    type: String,
    example: '',
  })

  @ApiProperty({
    description: '',
    type: String,
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
    type: String,
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}