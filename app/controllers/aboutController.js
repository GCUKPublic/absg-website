const aboutActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    Promise.all([
        cms.cmsClient.getEntries({
            'content_type': 'person',
            'select': 'fields.name,fields.slug',
            'fields.status': true,
             order: '-fields.role',
             
        })
    ])
    .then(([people]) => {
        console.log(people.items);
        res.render('about-us/index', {
            people
        });
    })
    .catch(error => {
        console.log(error);
    });
}

exports.person_get = function (req, res) {
    var slug = req.params.slug;
    if(slug ===undefined)
    {
        res.redirect('/about-us');
    }
    if (slug) {
        Promise.all([
                cms.cmsClient.getEntries({
                    'content_type': 'person',
                    'fields.slug': slug,
                    'fields.status': true,
                }),
                cms.cmsClient.getEntries({
                    'content_type': 'person',
                    'fields.slug[ne]': slug,
                    'fields.status': true,
                    'select': 'fields.name,fields.slug',
                     order: '-fields.role'
                })

            ])
            .then(([person,people]) => {
                console.log(person.items);
                person = person.items[0];
                res.render('about-us/person', {
                    person,
                    people
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

}

exports.registerofinterest_get = function (req, res) {
    res.render('about/register-of-interest', {
        aboutActive
    });
}

