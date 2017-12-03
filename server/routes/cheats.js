require('dotenv').config();

const express = require('express');

const router = express.Router();

const basicAuth = require('basic-auth');
const password = process.env.PASS;
const username = process.env.USER;

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        console.log(process.env.USERNAME, 'usernameyeahs');
        return unauthorized(res);
    };

    if (user.name === username && user.pass === password) {
        console.log(username, 'username')
        return next();
    } else {
        return unauthorized(res);
    };
};

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ianrussel.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://ianrussel.auth0.com/api/v2/',
    issuer: `https://ianrussel.auth0.com/`,
    algorithms: ['RS256']
});
/******************************
require our cheat controller
******************************/

const cheat_controller = require('../controllers/cheatController');

/******************************
show all cheats
******************************/

router.get('/showAllCheater', cheat_controller.index);

/******************************
add new cheats
******************************/

router.post('/addvueform', auth,cheat_controller.create_cheat);

/*****************************
get names from cheaters
*****************************/

router.get('/getcheaternames', cheat_controller.getcheaternames);

/****************************
delete cheater
****************************/
router.post('/deleteCheater', checkJwt, cheat_controller.deleteCheater);

/***************************
edit cheater
****************************/
router.post('/editvueform', cheat_controller.editCheater);

/****************************
search cheater
*****************************/
router.get('/searchCheater', cheat_controller.searchCheater);

/****************************
add Bug
****************************/
router.post('/addBug', cheat_controller.addBug);
/***************************
get all bugs
***************************/
router.get('/getAllBugs', cheat_controller.getBugs);

router.post('/login', cheat_controller.login);

module.exports = router;
