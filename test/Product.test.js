const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("Product API endpoint test", function () {

  it("Get all 200 products", function (done) {
    chai
      .request(app)
      .get("/product")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.products).to.be.an("array");
        expect(res.body.products).to.have.lengthOf(200);        
        done();
      });
  });

  it("Get product by ID 17", function (done) {
    chai
      .request(app)
      .get("/product/17")
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.product).to.be.an("object");
        console.log(res.body.product);
        done();
      });
  });

    it('No product above id 200', function(done) {
        chai.request(app)
        .get('/product/201')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(422);
            // console.log(res.body);
            done();
        })
    });

    it('Create product', function(done){
        chai.request(app)
        .post('/product')
        .send({
            title: "New Product Title",
            price: "59.99",
            description: "Product description"
        })
        .end(function(err, res){
            if(err) done();
            expect(res.status).to.equal(201);
            console.log(res.body.product);
            done();
        })
    });

    it('Update product with id 25', function(done){
        chai.request(app)
        .put('/product/25')
        .send({
            title: "New Product Title Updated",
            price: "49.99",
            description: "Product description updated"
        })
        .end(function(err, res){
            if(err) done();
            expect(res.status).to.equal(200);
            console.log(res.body.product);
            done();
        })
    });    

    it('Delete product with id 55', function(done){
        chai.request(app)
        .delete('/product/55')
        .end(function(err, res){
            if(err) done();
            expect(res.status).to.equal(200);
            done();
        })
    })    
});
