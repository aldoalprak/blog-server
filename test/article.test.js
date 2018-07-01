const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const jwt = require('jsonwebtoken')
chai.use(chaiHttp)
var mongoose = require('mongoose');
var id = ""


describe('post article', function(){
    // this.timeout(1000000);
    let token=""
  
    before(function(done) {
        console.log("masuk before")
        chai.request('http://localhost:3000')
        .post('/users/signin')
        .send({
            '_method': 'post',
            'email': 'aldo@mail.com',
            'password': 'helloworld123'
        })
        .end(function(err,res){
            token = res.body.token
            // console.log("====",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.dataUser).to.have.property('email')
            expect(res.body.dataUser).to.have.property('password')
            console.log("ppppp",token);
            done()
        }) 
    })

    it('post article test expect succeed',function(done) {
        // setTimeout(done, 1000000);
        console.log(token,"tokenpost****")
        // let decoded = jwt.verify(token,"helloworld123")
           
        chai.request('localhost:3000')
        .post('/articles/add')
        .type('form')
        .set('token',token)
        .send({
            '_method': 'post',
            'userId': '5b320546d5c84a428bf02f35',
            'title': 'blog post',
            'content':'helloworld' 
        })
        .end(function(err,res) {
            // console.log(res.body)
            expect(res).to.have.status(200);
            expect(res.body.dataArticle).to.have.property('userId')
            expect(res.body.dataArticle).to.have.property('title')
            expect(res.body.dataArticle).to.have.property('content')
            id = res.body.dataArticle._id
            console.log(id)
            done();
        })
    })
})

describe('get article',function() {
    it("get article test",function(done) {
        chai.request('http://localhost:3000')
        .get('/articles/show')
        .end(function(err,res){
            expect(res).to.have.status(200);
            done()
        })
    })
})



describe('delete article',function() {
    this.timeout(7000);
    let token=""
    console.log("masuk=====")
    before(function(done) {
        console.log("masuk before delete")
        chai.request('http://localhost:3000')
        .post('/users/signin')
        .type('form')
        .send({
            '_method': 'post',
            'email': 'aldo@mail.com',
            'password': 'helloworld123'
        })
        .end(function(err,res){
            token = res.body.token
            console.log("====",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.dataUser).to.have.property('email')
            expect(res.body.dataUser).to.have.property('password')
            console.log("ppppp",token);
            done()
        })
            
    })

    it("delete article test",function(done) {
        console.log("masuk delete")
        console.log(id)
        console.log("token delete==",token);
        
        chai.request('http://localhost:3000')
        .delete(`/articles/delete/${id}`)
        .set('token', token)
        .end(function(err,res){
            console.log(err)
            expect(res).to.have.status(200);
            done()
        })
    })
    
    
})

