import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto'
import { AuthenticationExceptionMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/account-config';
import { Token, User } from '@project/shared-core';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJWTPayload } from '@project/shared-helpers';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, login, avatar, password } = dto;

    const blogUser = {
      email,
      login,
      avatar,
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationExceptionMessage.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthenticationExceptionMessage.UserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthenticationExceptionMessage.UserPasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthenticationExceptionMessage.UserNotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordDto) {
    const { password, newPassword, userId } = dto;

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(AuthenticationExceptionMessage.UserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthenticationExceptionMessage.UserPasswordWrong);
    }

    const updatedUser = await new BlogUserEntity(existUser).setPassword(
      newPassword
    );

    return await this.blogUserRepository.update(updatedUser);
  }
}
