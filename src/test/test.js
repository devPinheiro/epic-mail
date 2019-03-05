import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
  
  // POST create a new user test
  describe('POST register a new user test', () => {

     it('It should allow new users sign up', (done) => {
        // using chai-http plugin
        chai.request(app)
        .post('/api/v1/auth/signup/')
        .send({
            firstName: "tester",
            lastName: "tester",
            email: "tester@test.com",
            password: "tester",
            role: "admin"
        })
        .end((err, res) => {      
          expect(err).to.be.null;
          res.should.have.status(201);
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          done();
        })
    });
    
    it('It should respond with an error if user exists', (done) => {
        // using chai-http plugin
        chai.request(app)
        .post('/api/v1/auth/signup/')
        .send({
            firstName: "tester",
            lastName: "tester",
            email: "tester@test.com",
            password: "tester",
            role: "admin"
        })
        .end((err, res) => {      
          expect(err).to.be.null;
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        })
    })

    it('It should respond with an error if user credentials are incorrect', (done) => {
        // using chai-http plugin
        chai.request(app)
        .post('/api/v1/auth/signup/')
        .send({
            firstName: "",
            lastName: "",
            email: "",
            password: "tester",
            role: "admin"
        })
        .end((err, res) => {      
          expect(err).to.be.null;
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        })
    })
    
    
});





 // Custom Error Handling Tests
 describe('Check for any wrong endpoints', () => {

     it('custom error checking', (done) => {
         // using chai-http plugin
         chai.request(app)
             .get('/api/v1/')
             .end((err, res) => {
                 expect(err).to.be.null;
                 res.should.have.status(404);
                 done();
             })
     })
 });