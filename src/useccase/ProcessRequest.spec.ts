import { when, spy, anything, verify } from "ts-mockito";
import { SaveOptions, RemoveOptions } from "typeorm";
import { RequestProcess } from "../entities/RequestProcess";
import { RequestAxiosService } from "../services/RequestAxiosService";
import { ProcessRequest } from "./ProcessRequests";

describe("Testing the request process usecase", () => {
  it("should return the testcase which is sent to create the request when the request create sucessfull", async () => {
    const testCase: any = {
      simNumber: "8111812091",
      requestCategory: "Reactivation",
      requestedBy: "amalabc@gmail.com",
    };

    const datarequestMock = spy(RequestProcess);

    when(
      datarequestMock.saveRequest(anything(), anything(), anything())
    ).thenResolve(testCase);
    // when(datarequestMock.)
    const result = await ProcessRequest.createRequest(testCase);
    verify(datarequestMock.saveRequest(anything(), anything(), anything()));
    expect(result).toBe(testCase);
  });

  it("should return the error message  when sim number not in the Sim_directory table", async () => {
    try {
      const testCase: any = {
        simNumber: "9947gh551213",
        requestCategory: "Activation",
        requestedBy: "amalabc@gmail.com",
      };

      const error: any = "The phone number in not in database";

      const datarequestMock = spy(RequestProcess);

      when(
        datarequestMock.saveRequest(anything(), anything(), anything())
      ).thenResolve(error);
      // when(datarequestMock.)
      const result = await ProcessRequest.createRequest(testCase);
      verify(datarequestMock.saveRequest(anything(), anything(), anything()));
    } catch (error: any) {
      expect(error.message).toBe("The phone number in not in database");
    }
  });
});
