import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import tables from '../api/V1/models/db';

const should = chai.should();
const {expect} = chai;
chai.use(chaiHttp);


let id;
let token;

// POST create a new user test
describe('POST register a new user test', () => {
  it('It should allow new users sign up', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'tester',
        lastName: 'tester',
        email: 'tester@test.com',
        password: 'tester',
        role: 'admin',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(201);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });

  it('It should respond with an error if user exists', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/signup/')
      .send({
        firstName: 'tester',
        lastName: 'tester',
        email: 'tester@test.com',
        password: 'tester',
        role: 'admin',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });

  it('It should respond with an error if user credentials are incorrect', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/signup/')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: 'tester',
        role: 'admin',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});


// POST user login test
describe('POST user login test', () => {
  it('It should allow new users sign in', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/login/')
      .send({
        email: 'tester@test.com',
        password: 'tester',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        token = res.body.data.token;
        done();
      });
  });

  it('It should respond with an error if user does not exists', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tester@no-reply.com',
        password: 'tester',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });

  it('It should respond with an error if user credentials are incorrect', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: 'tester',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});


// POST create / send email
describe('POST  create / send email ', () => {
  it('It should allow user create / send email ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/messages/')
      .set('x-access-token', token)
      .send({
        subject: 'I have a serious bug again',
        message: 'You have been accepted into the fellowship',
        receiverId: 'tester@test.com',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(201);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });


  it('It should respond with an error if user credentials are incorrect', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/messages/')
      .set('x-access-token', token)
      .send({
        subject: '',
        message: 'You have been accepted into the fellowship',
        receiverId: 'sammy@andela-epic.com',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});


// GET all received messages
describe('GET fetch all received messages ', () => {
  it('It should fetch all received messages ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .get('/api/v1/messages/')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        id = res.body.data[0].message_id;
        done();
      });
  });
});

// GET all sent messages
describe('GET fetch sent messages ', () => {
  it('It should fetch sent messages ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .get('/api/v1/messages/sent')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});

// GET all unread messages
describe('GET fetch unread messages ', () => {
  it('It should fetch unread messages ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');

        done();
      });
  });
});

// GET fetch single message
describe('GET fetch single message ', () => {
  it('It should fetch single message ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .get(`/api/v1/messages/${id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });

  it('It should resturn an error for wrong <message-id> ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .get('/api/v1/messages/3e90jn0-i')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        expect(res.body.error.id[0]).to.be.equal('The id must be a number.');
        done();
      });
  });
});


// DELETE delete specific mail message
describe('DELETE delete specific mail message ', () => {
  it('It should delete specific mail message ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .delete(`/api/v1/messages/${id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.have.property('status');
        done();
      });
  });

  it('It should resturn an error for wrong <message-id> ', (done) => {
    // using chai-http plugin
    chai.request(app)
      .delete('/api/v1/messages/7')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        expect(res.body.error).to.be.equal('message does not exist');
        done();
      });
  });
});

// Passwword Reset Test
describe('Password reset', () => {
  it('check if user exists', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'sa@epicyyy.com',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(404);
        done();
      });
  });

  it('check if user enters wrong input', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: ''
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.body.should.have.status(400);
        done();
      });
  });

  it('reset users password', (done) => {
    // using chai-http plugin
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'tester@test.com',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.body.have.property('data');
        done();
      });
  });

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
      });
  });
});
