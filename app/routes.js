const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
//lets have a controller for each content type
var newsController = require('./controllers/newsController.js')
router.get('/news/', newsController.index_get);
router.get('/news/:id', newsController.index_get);
router.get('/news/story/:slug', newsController.index_get);
module.exports = router
