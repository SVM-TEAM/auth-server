import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService implements OnModuleInit {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}
  onModuleInit() {
    this.redis.on('connect', () => {
      this.logger.log('Redis connection successful');
    });

    this.redis.on('error', (err) => {
      this.logger.error('Redis connection error:', err);
    });
  }

  async set<T>(key: string, value: T, ttl: number) {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get<T>(key: string): Promise<T> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
