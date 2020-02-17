const contactActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.notifykey);



exports.index_get = function (req, res) {

    res.render('contact/index', {
        contactActive
    });
}

exports.index_post = function (req, res) {

    console.log("post")

    var name = req.session.data['name'];
    var contact = req.session.data['contact'];
    var message = req.session.data['message'];




    // Send notification
    notify
        .sendEmail(process.env.contacttemplate, process.env.recipient, {
            personalisation: {
                'name': name,
                'contact': contact,
                'message': message
            }
        })
        .then(response => console.log("Sent"))
        .catch(err => console.error("errored"))

    res.render('contact/sent', {
        contactActive
    });
}