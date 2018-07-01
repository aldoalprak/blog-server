const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const articleSchema = new Schema({
    title: String,
    content: String,
    userId:{type: ObjectId, ref: 'User' }
},{timestamps:true})

const ArticleModel = mongoose.model("Article", articleSchema)


module.exports = ArticleModel