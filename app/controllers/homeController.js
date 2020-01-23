const contentful = require('contentful')

const client = contentful.createClient({
    space: process.env.space,
    accessToken: process.env.spaceapi
})

exports.index_get = function (req, res) {

    var homeactive = 'active';

    res.render('index', {
        homeactive
    });
}