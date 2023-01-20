import { RequestProcess } from "../entities/RequestProcess";
import { ProcessRequest } from "../useccase/ProcessRequests";

export class RequestController {
  static async requestCreate(payload: any) {
    const data = await ProcessRequest.createRequest(payload);
    return data;
  }

  static async requestGet(key) {
    const data: RequestProcess[] = await ProcessRequest.getRequest(key);
    return data;
  }

  static async updateRequest(body, id) {
    const data = await ProcessRequest.updateRequest(body, id);
    return data;
  }
}
