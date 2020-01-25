const contentful = require('contentful')

const client = contentful.createClient({
    space: process.env.space,
    accessToken: process.env.spaceapi
})

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
                client.getEntries({
                    'content_type': 'news',
                    'fields.slug': slug
                })
            ])
            .then(([n]) => {
                content_page = n;
                console.log(n.items);
                res.render('news/story', {
                    content_page,
                    newsactive

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
                client.getEntries({
                    'content_type': 'news',
                    'fields.publishedDate[gte]': yearFrom,
                    'fields.publishedDate[lte]': yearTo,
                    'select': 'fields.title,fields.publishedDate,fields.slug,fields.typeOfArticle',
                     order: '-fields.publishedDate'
                }),
                client.getEntries({
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