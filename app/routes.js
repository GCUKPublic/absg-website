const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// lets have a controller for each content type
var newsController = require('./controllers/newsController.js')
var homeController = require('./controllers/homeController.js')
var contactController = require('./controllers/contactController.js')
var aboutController = require('./controllers/aboutController.js')
var researchController = require('./controllers/researchController.js')
var searchController = require('./controllers/searchController.js')

// Homepage and standard pages
router.get('/', homeController.index_get);

// See trello: https://trello.com/c/xXqfQZOB 
router.get('/accessibility', homeController.accessibility_get);
router.get('/privacy-and-cookies', homeController.privacy_get);
router.get('/terms-and-conditions', homeController.terms_get);
router.get('/related-organisations', homeController.related_get);

// Search
router.post('/search/', searchController.index_post);

// News pages
router.get('/news/', newsController.index_get);
router.get('/news/:id', newsController.index_get);
router.get('/news/story/:slug', newsController.index_get);

// Contact us
router.get('/contact-us/', contactController.index_get);

// About us
router.get('/about-us/', aboutController.index_get);
router.get('/about-us/board-members', aboutController.boardmembers_get);
router.get('/about-us/board-minutes', aboutController.var_boardminutes_get);
router.get('/about-us/governance', aboutController.governance_get);
router.get('/about-us/person/:slug', aboutController.person_get);

router.get('/about-us/transparency/:slug', aboutController.transparency_get);
router.get('/about-us/transparency/board-minutes/:id', aboutController.boardminutes_get);
router.get('/about-us/transparency/board-minutes/:slug', aboutController.boardminutes_get);

// Research pages
router.get('/research-and-analysis/', researchController.index_get);
router.get('/research-and-analysis/:id', researchController.index_get);
router.get('/research-and-analysis/pub/:slug', researchController.index_get);

module.exports = router
