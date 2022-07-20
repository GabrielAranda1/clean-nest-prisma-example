import ioredis from 'ioredis';
import { promisify } from 'util';

const ioRedisClient = new ioredis();
const getRedisPromisified = promisify(ioRedisClient.get).bind(ioRedisClient);
const setRedisPromisified = promisify(ioRedisClient.set).bind(ioRedisClient);

export const getRedis = (value: string) => getRedisPromisified(value);
export const setRedis = (key: string, value: string) => setRedisPromisified(key, value);

export const redisClient = {
  getRedis,
  setRedis,
};