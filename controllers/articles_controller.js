const ArticleModel = require('../models/article.js')
const UserModel = require('../models/user.js')
const jwt = require('jsonwebtoken')

class Article {
    
    static add(req,res) {
        const dataArticle = {
            title: req.body.title,
            content: req.body.content
        }

        const decoded = jwt.verify(req.headers.token,"helloworld123")    
        dataArticle.userId = decoded.userId
        

        ArticleModel.create(dataArticle)
        .then(dataArticle=>{
            res.status(200).json({message:"article created",dataArticle})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static show(req,res) {
        ArticleModel.find()
        .then(dataArticles=>{
            res.status(200).json({message:"show articles",dataArticles})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static delete(req,res) {
        const decoded = jwt.verify(req.headers.token,"helloworld123")
        ArticleModel.findById({_id:req.params.id})
        .then(dataArticle=>{
            if(dataArticle) {
                if(dataArticle.userId == decoded.userId) {
                    ArticleModel.deleteOne({_id:req.params.id})
                    .then(result=>{
                        res.status(200).json({message:"article deleted",result})
                    })
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })
                }else{
                    res.status(500).json({message:"you dont have authorized"})
                }    
            }else{
                res.status(500).json({message:"article not found"})
            }
            
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
        
    }

    static update(req,res) {
        ArticleModel.findById({_id:req.params.id})
        .then(dataArticle=>{
            console.log(dataArticle,"====")
            if(dataArticle) {
                const decoded = jwt.verify(req.headers.token,"helloworld123")
                if(dataArticle.userId == decoded.userId) {
                    ArticleModel.updateOne({_id:req.params.id},{$set:req.body})
                    .then(result=>{
                        res.status(200).json({message:"article updated",result})
                    })
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })
                }else{
                    console.log("xx")
                    res.status(500).json({message:"you dont have authorized"})
                }
            }else{
                res.status(500).json({message:"article not found"})
            }
            
        })
        .catch(err=>{
            console.log(dataArticle,"====")
            res.status(500).json({message:err.message})
        })
        
    }

}

module.exports =  Article