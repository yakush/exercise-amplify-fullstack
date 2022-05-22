import Bull, { Job } from "bull";

/**
 * create a bull queue connected to redis
 * @param queueName queue name
 * @returns the bull queue
 */
export function createQueue<T = any>(queueName: string) {
  return new Bull<T>(queueName, {
    redis: {
      host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT || 6379),
    },
  });
}
