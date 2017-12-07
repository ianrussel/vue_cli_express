require('dotenv').config();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const DOMAIN = process.env.AUTH0_DOMAIN;
const AUDIENCE = process.env.AUTH0_AUDIENCE;
const JWKSURI = process.env.JWKSURI;
const ISSUER = process.env.ISSUER;

const tokenGuard = jwt({
    // Fetch the signing key based on the KID in the header and
    // the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: JWKSURI
    }),

    // Validate the audience and the issuer.
    audience: AUDIENCE,
    issuer: ISSUER,
    algorithms: ['HS256']
});

module.exports = function (scopes) {
    const scopesGuard = jwtAuthz(scopes || []);
    return function mid(req, res, next) {
        tokenGuard(req, res, (err) => {
            err ? res.status(500).send(err) : scopesGuard(req, res, next);
        });
    }
};
