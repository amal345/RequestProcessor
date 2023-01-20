import { Connection, createConnection } from 'typeorm'
import {RequestProcess} from '../entities/RequestProcess'

export class DbConfig {

   static async connection() {

      return new Promise<Connection>((resolve, reject) => {
         try {
          const connection=  createConnection({
               type: 'postgres',
               host: 'localhost',
               port: 5432,
               username: 'postgres',
               password: 'default',
               database: 'Provisioning_Test',
               entities:[RequestProcess]
              
            })
            resolve(connection)
   
         }
         catch (error: any) {
            throw new Error(error)
         }
         
      })
     
   }

   
}

