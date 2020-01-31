const researchActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    res.render('research-and-analysis/index', {
        researchActive
    });
}

exports.index_get = function (req, res) {
    var list_of_pages;
    var year = req.params.id;
    //validate year here
    if (year === undefined) {
        Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'researchPublication',
                'select': 'fields.title,fields.publishedDate,fields.slug',
                order: '-fields.publishedDate'
            })
        ])
            .then(([n]) => {
                list_of_pages = n;
                console.log(n.items);
                res.render('research-and-analysis/index', {
                    researchActive,
                    list_of_pages
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    if (year) {
        var yearFrom = year + '-01-01T00:00:00Z';
        var yearTo = year + '-12-31T23:59:59Z';
        //validate year
        console.log(year)
        Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'researchPublication',
                'fields.publishedDate[gte]': yearFrom,
                'fields.publishedDate[lte]': yearTo,
                'select': 'fields.title,fields.publishedDate,fields.slug',
                order: '-fields.publishedDate'
            })
        ])
            .then(([n]) => {
                list_of_pages = n;
                console.log(n.items);
                res.render('research-and-analysis/index', {
                    year,
                    list_of_pages,
                    researchActive
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

exports.publication_index_get = function (req, res) {
    var slug = req.params.slug
    if (slug === undefined) {
        res.redirect('/research-and-analysis/');
    }
    Promise.all([
        cms.cmsClient.getEntries({
            'content_type': 'researchPublication',
            'fields.slug': slug
        }),
    ])
        .then(([n]) => {
            publication = n.items[0];
            //console.log(publication);
            console.log(publication.fields.files);
            res.render('research-and-analysis/publication/index', {
                publication, researchActive
            });
        })
        .catch(error => {
            console.log(error);
        });
}