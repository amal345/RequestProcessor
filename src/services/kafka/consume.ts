import kafka from "node-rdkafka";
import { ProcessRequest } from "../../useccase/ProcessRequests";

export class Consume {
  static async kafkaConsumer() {
    return new Promise((resolve, rejects) => {
      try {
        var consumer = new kafka.KafkaConsumer(
          {
            "group.id": "kafka",
            "metadata.broker.list": "AAkumar-1023.kore-corp.lcl:9092",
          },
          {}
        );
        consumer.connect();
        consumer
          .on("ready", function () {
            consumer.subscribe(["request-completion"]);
            consumer.consume();
          })
          .on("data", async (data: any) => {
            const requests = JSON.parse(data.value.toString());
            //  console.log(requests);
            try {
              const result = await ProcessRequest.updateRequest(requests);
              resolve(result);
            } catch (error) {
              console.log(error.message);
              rejects(error);
            }
          });
      } catch (err) {
        rejects(err);
      }
    });
  }
}
