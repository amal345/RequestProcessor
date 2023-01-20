import supertest from 'supertest'
import chai from 'chai';
import chaiHttp from 'chai-http';
const request = supertest('http://localhost:5000/')
chai.should()
// chai.expect()
chai.use(chaiHttp)


describe('Request ApI', () => {
   
    describe('Get REquest', () => {
        it('It should GET all the requests', () => {

            return request.get("request/getrequest/getAll").then((response) => {
                // console.log(response)
                response.should.have.status(200);
                response.body.should.be.a('array');

            })
        })

        it('It should GET all the requests corresponding to the valid mailid', () => {

            const mailID: string[]=['admin@gmail.com','amal@gmail.com']
            const owner={
                mail:mailID[Math.floor(Math.random()*mailID.length)]
            } 
            return request.get(`request/getrequest/${owner.mail}`).then((response) =>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.forEach(element => {
                element.requestedby.should.be.equal(owner.mail)    
                });   
            })
        })

        it('It should response when the data is not in the database of coressponding mailid',() => {

            const ownerMail="abc@gmail.com";
            return request.get(`request/getrequest/${ownerMail}`).then((response) => {
                response.should.have.status(500);
                response.text.should.be.a('string');
                response.text.should.be.equal('{"error":"Data is not in the databse"}')
                
            })
        })
    })

})
