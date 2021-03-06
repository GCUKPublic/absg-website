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
router.get('/useful-links', homeController.useful_get);

// Search
router.get('/search/', searchController.index_get);

// News pages
router.get('/news/', newsController.index_get);
router.get('/news/:id', newsController.index_get);
router.get('/news/story/:slug', newsController.index_get);

// Contact us
router.get('/contact-us/', contactController.index_get);
router.post('/contact-us/', contactController.index_post);

// About us
router.get('/about-us/', aboutController.index_get);
router.get('/about-us/board-members', aboutController.boardmembers_get);
router.get('/about-us/board-minutes', aboutController.var_boardminutes_get);
router.get('/about-us/board-minutes-archive', aboutController.var_boardminutes_archive_get);
router.get('/about-us/governance', aboutController.governance_get);
router.get('/about-us/person/:slug', aboutController.person_get);
router.get('/about-us/transparency/:slug', aboutController.transparency_get);
router.get('/about-us/transparency/board-minutes/:id', aboutController.boardminutes_get);
router.get('/about-us/transparency/board-minutes/:slug', aboutController.boardminutes_get);
router.get('/about-us/transparency/register-of-interest/:slug', aboutController.registerofinterest_get);

router.get('/about-us/full-register-of-interest', aboutController.fullregisterofinterest_get);

// Research pages
router.get('/research-and-analysis/', researchController.index_get);
router.get('/research-and-analysis/:id', researchController.index_get);
router.get('/research-and-analysis/publication/:slug', researchController.publication_index_get);

module.exports = router
