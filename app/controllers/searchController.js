const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    var searchResults;

    var search_term = req.session.data['query'];

    Promise.all([
        cms.cmsClient.getEntries({
            'query': search_term,
            order: 'sys.updatedAt'
        })
    ])
        .then(([n]) => {
            searchResults = n;

            res.render('search/results', {
                searchResults,
                search_term
            });
        })
        .catch(error => {
            //console.log(error);
        });

}