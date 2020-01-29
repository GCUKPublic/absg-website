const homeactive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {


    // AWJ - The homepage needs to show the latest 3 news stories. 
    // This could be a module - it's rendered out into a partial. 
    var listlistOfNews;

    Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'news',
                limit: 3,
                'select': 'fields.title,fields.publishedDate,fields.slug,fields.typeOfArticle',
                order: '-fields.publishedDate'
            })
        ])
        .then(([n]) => {
            listOfNews = n;

            res.render('index', {
                homeactive,
                listOfNews
            });
        })
        .catch(error => {
            console.log(error);
        });


}

exports.accessibility_get = function (req, res) {
    var content;
    Promise.all([
            cms.cmsClient.getEntry('FxW2OvQhrcgLNokG4p6p3')
        ])
        .then(([n]) => {
            content = n;
            console.log(n)
            res.render('accessibility', {
                homeactive,
                content
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.privacy_get = function (req, res) {
    var content;
    Promise.all([
            cms.cmsClient.getEntry('4X91ylaR5VW47wTEgBsDSh')
        ])
        .then(([n]) => {
            content = n;
            console.log(n)
            res.render('privacy-and-cookies', {
                homeactive,
                content
            });
        })
        .catch(error => {
            console.log(error);
        });
}


exports.terms_get = function (req, res) {
    var content;
    Promise.all([
            cms.cmsClient.getEntry('3Y0Edq5BjCXBdc2ytKkJK1')
        ])
        .then(([n]) => {
            content = n;
            console.log(n)
            res.render('terms-and-conditions', {
                homeactive,
                content
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.related_get = function (req, res) {
    var content;
    Promise.all([
            cms.cmsClient.getEntry('2yVHnPMlEjm2u29gqIMdFp')
        ])
        .then(([n]) => {
            content = n;
            console.log(n)
            res.render('related-organisations', {
                homeactive,
                content
            });
        })
        .catch(error => {
            console.log(error);
        });
}
