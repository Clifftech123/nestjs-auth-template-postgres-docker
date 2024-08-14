import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let hashService: HashService;
  let jwtService: JwtService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUniqueByEmail: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: HashService,
          useValue: {
            comparePassword: jest.fn(),
            hashPassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    hashService = module.get<HashService>(HashService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user if email and password are valid', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(mockUser);
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(null);

      await expect(service.validateUser('test@example.com', 'password')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if password is invalid', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(mockUser);
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(false);

      await expect(service.validateUser('test@example.com', 'password')).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return access token if email and password are valid', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(mockUser);
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');

      const result = await service.login({ email: 'test@example.com', password: 'password' });
      expect(result).toEqual({ access_token: 'access_token' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(null);

      await expect(service.login({ email: 'test@example.com', password: 'password' })).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(mockUser);
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(false);

      await expect(service.login({ email: 'test@example.com', password: 'password' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create a new user if email does not exist', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password', name: 'Test User' };
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(null);
      jest.spyOn(hashService, 'hashPassword').mockResolvedValue('hashedPassword');
      jest.spyOn(usersService, 'create').mockResolvedValue({ id: '1', ...createUserDto, password: 'hashedPassword' });

      const result = await service.register(createUserDto);
      expect(result).toEqual({ id: '1', ...createUserDto, password: 'hashedPassword' });
    });

    it('should throw BadRequestException if email already exists', async () => {
      jest.spyOn(usersService, 'findUniqueByEmail').mockResolvedValue(mockUser);

      await expect(service.register(mockUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getProfile', () => {
    it('should return user profile if user is found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);

      const result = await service.getProfile('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(service.getProfile('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateUserDto = { email: 'test@example.com', name: 'Updated User', password: 'newPassword' };
      jest.spyOn(usersService, 'update').mockResolvedValue({ id: '1', ...updateUserDto });

      const result = await service.updateProfile('1', updateUserDto);
      expect(result).toEqual({ id: '1', ...updateUserDto });
    });
  });

  describe('deleteProfile', () => {
    it('should delete user profile', async () => {
      jest.spyOn(usersService, 'remove').mockResolvedValue(undefined);

      await expect(service.deleteProfile('1')).resolves.toBeUndefined();
    });
  });

  describe('changePassword', () => {
    it('should change user password', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(hashService, 'hashPassword').mockResolvedValue('newHashedPassword');
      jest.spyOn(usersService, 'update').mockResolvedValue({ id: '1', ...mockUser, password: 'newHashedPassword' });

      const result = await service.changePassword('1', 'newPassword');
      expect(result).toEqual({ id: '1', ...mockUser, password: 'newHashedPassword' });
    });
  });
});