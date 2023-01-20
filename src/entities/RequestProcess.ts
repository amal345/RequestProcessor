import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("request_process")
export class RequestProcess extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "requestid",
  })
  requestid: string;
  @Column()
  sim_number: string;

  @Column()
  requestcategory: string;

  @Column()
  requestedby: string;

  @Column({ name: "requesteddate" })
  requestedDate: string;

  @Column()
  Status: string;

  @UpdateDateColumn({ name: "updatedOn" })
    updatedOn :Date;
    

  static async saveRequest(
    simNumber: string,
    category: string,
    requestedby: string
  ): Promise<RequestProcess> {
    const requestProcess: RequestProcess = new RequestProcess();

    requestProcess.sim_number = simNumber;
    requestProcess.requestcategory = category;
    requestProcess.requestedby = requestedby;
    return requestProcess.save().then((result) => {
      return result;
    });
  }

  static async updateRequest(requestId, status): Promise<string> {
    try {
      const requestProcess: RequestProcess = new RequestProcess();
      requestProcess.Status = status;
      // console.log(sim_number+'jnjr');

      const sim = await RequestProcess.createQueryBuilder()
        .update(RequestProcess)
        .set(requestProcess)
        .where("requestid = :requestID", { requestID: requestId })
        .andWhere("Status=:status", { status: "pending" })
        .execute();
      // console.log(sim);
      if (sim.affected == 0) {
        throw new Error("Sim is not in pending state");
      }

      return "The Request is sent successfull please wait for the confirmation";
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllRequest(): Promise<RequestProcess[]> {
    const requestProcess: RequestProcess = new RequestProcess();
    const request: any[] = await RequestProcess.find({
      order: {
        requestedDate: "ASC",
      },
    });
    return request;
  }

  static async getOneRequest(requestmail: any): Promise<RequestProcess[]> {
    const requestProcess: RequestProcess = new RequestProcess();
    const request: any[] = await RequestProcess.find({
      where: {
        requestedby: requestmail,
      },
    });
    return request;
  }
}
