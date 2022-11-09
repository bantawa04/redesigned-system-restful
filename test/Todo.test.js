const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("Post API endpoint test", function () {
  it("Create new todo", function (done) {
    chai
      .request(app)
      .post("/todo")
      .send({ title: "Title from mocha test", status: true })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body.todo).to.be.an("object");
        console.log(res.body.todo);
        done();
      });
  });


  it("Delete todo of id 33", function (done) {
    chai
      .request(app)
      .delete("/todo/33")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("Get all 200 todos", function (done) {
    chai
      .request(app)
      .get("/todo")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.todos).to.be.an("array");
        expect(res.body.todos).to.have.lengthOf(200);        
        done();
      });
  });

  it("Get todo by ID 86", function (done) {
    chai
      .request(app)
      .get("/todo/86")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.todo).to.be.an("object");
        console.log(res.body.todo);
        done();
      });
  });

    it('No todo above id 200', function(done) {
        chai.request(app)
        .get('/todo/201')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(422);
            console.log(res.body);
            done();
        })
    });

    it('Cannot update post above ID 200', function(done) {
        chai.request(app)
        .put('/todo/201')
        .send({
            title: 'Todo title',
            status: false
        })
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(400);
            done();
        })
    });    

});
