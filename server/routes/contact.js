let express = require('express');
let router = express.Router();

let passport = require('passport');

// create a reference to the controller
let contactController = require('../controllers/contact');

function requireAuth(req, res, next) {
    //check to see if the user is logged in
    if (!req.isAuthenticated() || (req.user.username != 'admin')) {
        return res.redirect('./login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/', requireAuth, contactController.displayContactList);

/* GET Route for the Add page
    this will display the Add page */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST route for processing the Add page */
router.post('/add', requireAuth, contactController.addContact);

/* GET Route for the Edit page
    this will display the Edit page */
router.get('/edit/:id', requireAuth, contactController.displayContact);

/* POST route for processing the Edit page */
router.post('/edit/:id', requireAuth, contactController.updateContact);

/* GET request to perform delete action */
router.get('/delete/:id', requireAuth, contactController.deleteContact);

module.exports = router;