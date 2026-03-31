import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { config } from '../config/env';

export const redisConnection = new IORedis(config.redisUrl, {
  maxRetriesPerRequest: null,
});

export const queue = new Queue('aede', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export async function addJob(name: string, data: any, options?: any): Promise<void> {
  await queue.add(name, data, options);
}

export async function closeQueue(): Promise<void> {
  await queue.close();
  await redisConnection.quit();
}
