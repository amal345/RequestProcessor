import { RequestModel } from "../model/RequestModel";
import { RequestProcess } from "../entities/RequestProcess";
import { RequestAxiosService } from "../services/RequestAxiosService";
import { Produce } from "../services/kafka/Produce";

export class ProcessRequest {
  static async createRequest(payload: any) {
    const mapping: Map<String, String> = new Map([
      ["Activation", "Stock"],
      ["Deactivation", "Active"],
      ["Reactivation", "Deactive"],
    ]);
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const element = payload[key];
        const request: any = RequestModel.fromJson(element);
        // console.log("hi",request);

        const simdetails = await RequestAxiosService.getSim(request.simNumber);
        if (!simdetails) {
          throw new Error("The phone number in not in database");
        }
        if (!request.simNumber) {
          throw new Error("The phone number not be null or undefined");
        }
        if (mapping.get(request.requestCategory) === simdetails.state) {
          const requestResult: any = await RequestProcess.saveRequest(
            request.simNumber,
            request.requestCategory,
            request.requestedBy
          );
          new Produce().kafkaProducer(requestResult);
        } else {
          throw new Error(
            `Your sim is not in ${mapping.get(request.requestCategory)}`
          );
        }
      }
    }
    return "The Request is sent successfull please wait for the confirmation";
  }

  static async updateRequest(payload: any, requestId?: any) {
    try {
      let status: string;
      // console.log(payload.requestId);
      if (requestId) {
        status = payload.status;
        const result: string = await RequestProcess.updateRequest(
          requestId,
          payload.status
        );
        return result;
      } else {
        if (payload.responseCode !== 1) {
          throw new Error("The request is not valid");
        }
        // console.log(payload);
        status = "Completed";
        const result: string = await RequestProcess.updateRequest(
          payload.requestId,
          status
        );
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getRequest(key) {
    try {
      let request: RequestProcess[];
      if (key === "getAll") {
        request = await RequestProcess.getAllRequest();
      } else {
        request = await RequestProcess.getOneRequest(key);
      }
      if (!request.length) {
        throw new Error("Data is not in the databse");
      } else {
        return request;
      }
    } catch (error) {
      throw error;
    }
  }
}
