const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("User API endpoint test", function () {

  it("Get all 200 users", function (done) {
    chai
      .request(app)
      .get("/user")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.an("array");
        expect(res.body.users).to.have.lengthOf(200);        
        done();
      });
  });

  it("Get user by ID 11", function (done) {
    chai
      .request(app)
      .get("/user/11")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.user).to.be.an("object");
        console.log(res.body.user);
        done();
      });
  });

    it('No user above id 200', function(done) {
        chai.request(app)
        .get('/user/201')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(400);
            console.log(res.body);
            done();
        })
    });


});
