const router = require('express').Router()
const Article =require('../controllers/articles_controller.js')

router.post('/add', Article.add)
router.get('/show', Article.show)
router.get('/showone', Article.showOne)
router.delete('/delete/:id', Article.delete)
router.put('/update/:title', Article.update)


module.exports = router