
import kafka from 'node-rdkafka'

export class Produce {

    kafkaProducer(requestResult) {

        let producer = new kafka.Producer({
            'metadata.broker.list':'AAkumar-1023.kore-corp.lcl:9092',
            'dr_cb':true
        })

        producer.connect()

        producer.on('ready', () =>{
            try{

              const Message= producer.produce('request-creation', null,Buffer.from(JSON.stringify(requestResult)))
            //   producer.setPollInterval(100); 
              return Message
            }
            catch(error){
                console.error('A problem occurred when sending our message');
                console.error(error);
            }
            producer.setPollInterval(100);
        })
        
    }
    
}