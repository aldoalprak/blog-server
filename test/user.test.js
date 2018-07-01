const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

describe('signup test', function(){
    it('signup user expect true',function(done){
        chai.request('localhost:3000')
        .post('/users/signup')
        .type('form')
        .send({
            '_method': 'post',
            'username': 'aldo',
            'email': 'aldo@mail.com',
            'password': 'helloworld123'
        })
        .end(function(err,res){
            // console.log("====",res.body)
            expect(res).to.have.status(200)
            expect(res.body.dataUser).to.have.property('username')
            expect(res.body.dataUser).to.have.property('email')
            expect(res.body.dataUser).to.have.property('password')
            done()
        })
    })
})

describe('signin test', function(){
    it('signin user expect true',function(done){
        chai.request('localhost:3000')
        .post('/users/signin')
        .type('form')
        .send({
            '_method': 'post',
            'email': 'aldo@mail.com',
            'password': 'helloworld123'
        })
        .end(function(err,res){
            console.log("====",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.dataUser).to.have.property('email')
            expect(res.body.dataUser).to.have.property('password')
            done()
        })
    })
})