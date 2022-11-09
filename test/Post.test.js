const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {expect} = chai;

chai.use(chaiHttp);

describe('Post API endpoint test', function () {
    it('Create new post',  function (done)  {
        chai
        .request(app)
        .post('/post')
        .send({title: "Title from mocha test", content: "content entered from mocha test"})
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(201);
            expect(res.body.post).to.be.an('object');
            console.log('Created Post');
            console.log(res.body.post);
            done();
        });
    })

    it('Delete a post', function(done) {
         chai.request(app)
        .delete('/post/5')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(200);
            console.log('Post deleted');
            done();
        });
        
    });


    it('Get all 200 posts', function(done) {
        chai.request(app)
        .get('/post')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.posts).to.be.an('array');
            expect(res.body.posts).to.have.lengthOf(200);
            console.log('Length of posts array (200)');
            console.log(res.body.posts.length);
            done();
        })
    });

    it('Get 10 posts', function(done) {
        chai.request(app)
        .get('/post/?n=10')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.posts).to.be.an('array');
            expect(res.body.posts).to.have.lengthOf(10);
            done();
        })
    });

    it('Update post', function(done) {
        chai.request(app)
        .put('/post/18')
        .send({
            title: 'Updated post title',
            content: "Updated post content"
        })
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.post).to.be.an('object');
            console.log('Updated post');
            console.log(res.body.post);
            done();
        })
    });    

    it('Get post by id 24', function(done) {
        chai.request(app)
        .get('/post/24')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.post).to.be.an('object');
            console.log('Post got by ID');
            console.log(res.body.post);
            done();
        })
    });

    it('No post above id 200', function(done) {
        chai.request(app)
        .get('/post/201')
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(422);
            console.log(res.body.message);
            done();
        })
    });

    it('Cannot update post above ID 200', function(done) {
        chai.request(app)
        .put('/post/201')
        .send({
            title: 'Updated post title',
            content: "Updated post content"
        })
        .end(function(err, res){
            if(err) done(err);
            expect(res.status).to.equal(400);
            done();
        })
    });    


});