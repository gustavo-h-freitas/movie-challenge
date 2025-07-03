import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly API_KEY = 'your-secret-api-key-123'; // In production, this should be in environment variables

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] || request.headers['authorization'];

    if (!apiKey || apiKey !== `Bearer ${this.API_KEY}`) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
} 