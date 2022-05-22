export interface ApiReply<T = any> {
  status: string;
  data: T;
  error: string;
}

/**
 * determine if a reply from the API is valid (success status)
 * @param ApiReply
 * @returns true if api reply is a success
 */
export function isApiSuccess(ApiReply: ApiReply) {
  return ApiReply.status === 'success';
}

/**
 * extract the data from the API reply
 * @param ApiReply
 * @returns
 */
export function ApiReplyToData<T = any>(ApiReply: ApiReply<T>): T {
  return ApiReply.data;
}
