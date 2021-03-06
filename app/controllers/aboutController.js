const aboutActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    res.render('about-us/index-b', {
        aboutActive
    });

}

exports.var_boardminutes_archive_get = function (req, res) {

    res.render('about-us/board-minutes-archive', {
        aboutActive
    });

}


exports.boardmembers_get = function (req, res) {

    Promise.all([
        cms.cmsClient.getEntries({
            'content_type': 'person',
            'select': 'fields.name,fields.role,fields.slug,fields.image',
            order: '-fields.role,fields.name',

        })
    ])
        .then(([people]) => {
            //console.log(people.items);

            res.render('about-us/board-members', {
                people,
                aboutActive
            });
        })
        .catch(error => {
            //console.log(error);
        });
}

exports.person_get = function (req, res) {
    var slug = req.params.slug;
    if (slug === undefined) {
        res.redirect('/about-us');
    }
    if (slug) {
        Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'person',
                'fields.slug': slug,
                'fields.status': true
            }),
            cms.cmsClient.getEntries({
                'content_type': 'person',
                // 'fields.slug[ne]': slug,
                'fields.status': true,
                'select': 'fields.name,fields.slug',
                order: '-fields.role,fields.name',
            })

        ])
            .then(([person, people]) => {
                //console.log(person.items);
                person = person.items[0];
                res.render('about-us/person', {
                    person,
                    people,
                    aboutActive
                });
            })
            .catch(error => {
                //console.log(error);
            });
    }

}

exports.transparency_get = function (req, res) {

    // AWJ - Get the page for the data
    var slug = req.params.slug;

    if (slug === undefined) {
        return res.redirect('/about-us');
    }

    //console.log(slug);

    Promise.all([
        cms.cmsClient.getEntries({
            'content_type': 'transparencyData',
            'fields.slug': slug
        })
    ])
        .then(([n]) => {
            content_page = n;
            //console.log(n.items);

            if (n.items.length === 0) {
                return res.redirect('/about');
            }

            res.render('about-us/transparency/index', {
                content_page,
                aboutActive

            });
        })
        .catch(error => {
            //console.log(error);
        });


}

exports.boardminutes_get = function (req, res) {

    var slug = req.params.slug
    var year = req.params.id;

    if (slug === undefined && year === undefined) {
        year = '2020'
    }
    //filter by year if passed
    //or just latest year if no id 2020

    if (slug) {
        Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'boardMinutes',
                'fields.slug': slug
            })
        ])
            .then(([n]) => {
                content_page = n;
                //console.log(n.items);
                res.render('about-us/transparency/board-minutes/minutes', {
                    content_page,
                    aboutActive

                });
            })
            .catch(error => {
                //console.log(error);
            });
    }
    if (year) {
        var yearFrom = year + '-01-01T00:00:00Z';
        var yearTo = year + '-12-31T23:59:59Z';
        //console.log(yearFrom);
        //console.log(yearTo);
        //validate year
        var content_page;
        var list_of_pages;
        //var datetoSearchFrom = '01/01/:year';
        //console.log(year)
        Promise.all([
            cms.cmsClient.getEntries({
                'content_type': 'boardMinutes',
                'fields.publishedDate[gte]': yearFrom,
                'fields.publishedDate[lte]': yearTo,
                order: '-fields.publishedDate'
            }),
            cms.cmsClient.getEntries({
                'content_type': 'boardMinutes',
                'select': 'fields.publishedDate'
            })
        ])
            .then(([n, y]) => {
                list_of_pages = n;
                list_of_years = y;
                //create an array of year and count

                //console.log(n.items);
                res.render('about-us/transparency/board-minutes/index', {
                    year,
                    list_of_pages,
                    aboutActive

                });
            })
            .catch(error => {
                //console.log(error);
            });
    }
}

function getPersonBySlug(slug) {
    return cms.cmsClient.getEntries({
        'content_type': 'person',
        'fields.slug': slug,
        'fields.status': true,
        'select': 'sys.id'
    })
}

function getROIByPersonId(personId) {
    return cms.cmsClient.getEntries({
        'content_type': 'registerOfInterest',
        'fields.person.sys.id': personId,
    })
}

function getROIAll() {
    return cms.cmsClient.getEntries({
        'content_type': 'registerOfInterest',
        order: 'fields.title',
    })
}

function getAllPeople() {
    return cms.cmsClient.getEntries({
        'content_type': 'person',
        'fields.status': true,
        'select': 'fields.name,fields.slug',
        order: '-fields.role,fields.name',
    })
}

exports.registerofinterest_get = function (req, res) {
    var slug = req.params.slug;
    //this is the persons slug, to find interests for 
    if (slug === undefined) {
        res.redirect('/about-us');
    }
    if (slug) {
        var page, people;
        getPersonBySlug(slug)
            .then((entrys) =>
                getROIByPersonId(entrys.items[0].sys.id)
                    .then((roi) =>
                        getAllPeople()
                            .then((listofPeople) => {
                                ////console.log(roi.items[0]);
                                ////console.log(entrys.items[0]);
                                page = roi.items[0];
                                people = listofPeople;
                                res.render('about-us/transparency/register-of-interest/index', {
                                    page,
                                    aboutActive,
                                    people
                                })
                            }))
                    .catch(error => {
                        //console.log(error);
                    }));
    }
}

exports.fullregisterofinterest_get = function (req, res) {
    //console.log('full roi');

    getROIAll()
        .then((roi) => {
            page = roi.items;
            res.render('about-us/transparency/full-register-of-interest', {
                page,
                aboutActive,
            })
        }).catch(error => {
            //console.log(error);
        });

}


exports.var_boardminutes_get = function (req, res) {

    var content_page;
    var list_of_pages;

    Promise.all([
        cms.cmsClient.getEntries({
            'content_type': 'boardMinutes',
            order: '-fields.publishedDate'
        })

    ])
        .then(([n]) => {
            list_of_pages = n;
            //create an array of year and count

            //console.log(n.items);
            res.render('about-us/board-minutes', {
                list_of_pages,
                aboutActive

            });
        })
        .catch(error => {
            //console.log(error);
        });
}


exports.governance_get = function (req, res) {

    res.render('about-us/governance', {
        aboutActive
    });

}