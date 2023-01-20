import express from "express";
import { router as requestrouter } from "./route/RequestRoute"
import { DbConfig } from './config/DbConfig'
import { Consume } from './services/kafka/consume'
import cors from 'cors'



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DbConfig.connection().then(() => {
    console.log(`DataBase has been connected successfully in port:5432`);
    app.use('/request', requestrouter)
}).catch((error) => console.error(`DataBase connection error`, error))

Consume.kafkaConsumer().then(() => {
    console.log("COnsuming the data from the kafka consumer");
})
app.listen(5000, () => {
    console.log("server listening on port 5000");

})

export default app 