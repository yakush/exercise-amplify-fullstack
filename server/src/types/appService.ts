/**
 * base interface for all application services
 */
export interface IAppService {
  start: Promise<any> | (() => any);
  stop: Promise<any> | (() => any);
}
