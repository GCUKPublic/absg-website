const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
//lets have a controller for each content type
var newsController = require('./controllers/newsController.js')
var homeController = require('./controllers/homeController.js')
var contactController = require('./controllers/contactController.js')
var aboutController = require('./controllers/aboutController.js')
var researchController = require('./controllers/researchController.js')

// Homepage 
router.get('/', homeController.index_get);

// News pages
router.get('/news/', newsController.index_get);
router.get('/news/:id', newsController.index_get);
router.get('/news/story/:slug', newsController.index_get);

// Contact us
router.get('/contact-us/', contactController.index_get);

// About us
router.get('/about-us/', aboutController.index_get);
<<<<<<< HEAD
router.get('/about-us/person/:id', aboutController.person_get);
router.get('/about-us/transparency/:slug', aboutController.transparency_get);
router.get('/about-us/transparency/board-minutes/:id', aboutController.boardminutes_get);
router.get('/about-us/transparency/board-minutes/:slug', aboutController.boardminutes_get);
=======
router.get('/about-us/person/:slug', aboutController.person_get);
router.get('/about-us/register-of-interest/:id', aboutController.registerofinterest_get);
>>>>>>> 4c18779b76eb9b34c0e2984e0146ead4559f2d7e

// Research pages
router.get('/research-and-analysis/', researchController.index_get);
router.get('/research-and-analysis/:id', researchController.index_get);
router.get('/research-and-analysis/pub/:slug', researchController.index_get);

module.exports = router
