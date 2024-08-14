import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';
import { LoginDto } from './dto/LoginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUniqueByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await this.hashService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

 

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findUniqueByEmail(loginDto.email);
    console.log('User retrieved:', user); // Debugging log

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.comparePassword(loginDto.password, user.password);
    console.log('Password comparison result:', isPasswordValid); // Debugging log

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.usersService.findUniqueByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }


  async getProfile(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.update(id, updateUserDto);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.usersService.remove(id);
  }

 async changePassword(id: string, newPassword: string): Promise<any> {
  const hashedPassword = await this.hashService.hashPassword(newPassword);
  const user = await this.usersService.findOne(id); 
  const updateUserDto: UpdateUserDto = {
    name: user.username,
    email: user.email,
    password: hashedPassword,
  };
  return this.usersService.update(id, updateUserDto);
}
}