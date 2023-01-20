enum requestcategory {
  Activation = 0,
  Deactivation = 1,
  Reactivation = 2,
}

export class RequestModel {
  simNumber: string;
  requestCategory: requestcategory;
  requestedBy: string;

  constructor(
    simNumber: string,
    requestCategory: requestcategory,
    requestedBy: string
  ) {
    this.simNumber = simNumber;
    this.requestCategory = requestCategory;
    this.requestedBy = requestedBy;
  }

  static fromJson(json: any) {
    if (
      !Object.values(requestcategory).includes(
        json.requestCategory as requestcategory
      )
    ) {
      throw new TypeError(
        "state must be of Activation, Decativation or Reactivation"
      );
    }

    const request: RequestModel = new RequestModel(
      json.simNumber,
      json.requestCategory,
      json.requestedBy
    );

    return request;
  }
}
