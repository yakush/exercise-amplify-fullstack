export type API_RESPONSE_STATUS = "success" | "error";

/**
 * helper class for all API response 
 * either: {status:'success', data:{...}} 
 * or : {status:'error', error:"some error message"}
 */
export class ApiResponse<T> {
  public data?: T;
  public error?: string;
  status: API_RESPONSE_STATUS;

  constructor(status: API_RESPONSE_STATUS) {
    this.status = status;
  }
  /**
   * factory method - create a success response
   * @param data the payload
   */
  static OK<T>(data: T) {
    const res = new ApiResponse("success");
    res.data = data;
    return res;
  }

  /**
   * factory method - create an error response
   * @param error the error message
   */
  static ERROR(error: string) {
    const res = new ApiResponse("error");
    res.error = error;
    return res;
  }
}

export default ApiResponse;
