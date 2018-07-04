const UserModel = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class User {

    static signUp(req,res) {
        const dataUser = {
            username: req.body.username,
            email: req.body.email
        }
        const hash = bcrypt.hashSync(req.body.password,10)
        dataUser.password = hash
        UserModel.create(dataUser)
        .then(dataUser=>{
            res.status(200).json({message:"user created",dataUser})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static signIn(req,res) {
        UserModel.findOne({email:req.body.email})
        .then(dataUser=>{
            if(dataUser !== null) {
                const compare = bcrypt.compareSync(req.body.password,dataUser.password);
                if(compare) {
                    const token = jwt.sign({userId:dataUser._id},process.env.JWT_SALT)
                    res.status(200).json({message:"signin succeed",token,dataUser})    
                }else{
                    res.status(500).json({message:"invalid email/password"})    
                }

            }else{
                res.status(500).json({message:"invalid email/password"})
            }
                    
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
}

module.exports = User