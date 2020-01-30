// AWJ - I've moved the contentful declaration and client config into a module (think middleware) so this 1-liner can be used in all controllers
// Just call cms.cmsClient to call the API
// Ideally, the Promises should also go into modules to be reused and cached more easily to reduce API calls

const cms = require('../middleware/contentful');


exports.index_get = function (req, res) {

    var newsactive = 'active';

    var slug = req.params.slug
    var year = req.params.id;
    //validate year here
    if(slug ===undefined && year === undefined)
    {
        year='2020'
    }
    //filter by year if passed
    //or just latest year if no id 2020
    if (slug) {
        Promise.all([
                cms.cmsClient.getEntries({
                    'content_type': 'news',
                    'fields.slug': slug
                }),
                cms.cmsClient.getEntries({
                    'content_type': 'news',
                    limit: 3,
                    'select': 'fields.title,fields.publishedDate,fields.slug,fields.typeOfArticle',
                    order: '-fields.publishedDate'
                })
            ])
            .then(([n,l]) => {
                content_page = n;
                listOfNews = l;

                console.log(n.items);
                res.render('news/story', {
                    content_page,
                    newsactive,listOfNews

                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    if (year) {


        var yearFrom = year + '-01-01T00:00:00Z';
        var yearTo = year + '-12-31T23:59:59Z';
        console.log(yearFrom);
        console.log(yearTo);
        //validate year
        var content_page;
        var list_of_pages;
        //var datetoSearchFrom = '01/01/:year';
        console.log(year)
        Promise.all([
                cms.cmsClient.getEntries({
                    'content_type': 'news',
                    'fields.publishedDate[gte]': yearFrom,
                    'fields.publishedDate[lte]': yearTo,
                    'select': 'fields.title,fields.publishedDate,fields.slug,fields.typeOfArticle',
                     order: '-fields.publishedDate'
                }),
                cms.cmsClient.getEntries({
                    'content_type': 'news',
                    'select': 'fields.publishedDate'
                })
            ])
            .then(([n,y]) => {
                list_of_pages = n;
                list_of_years = y;
                //create an array of year and count
                
                console.log(n.items);
                 res.render('news/index', {
                    year,
                    list_of_pages,
                    newsactive

                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

exports.story_get = function (req, res) {
    //storys

}