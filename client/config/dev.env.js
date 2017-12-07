var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    CLIENTID: '"51re13he1en9TTW0JsLVCPYlwuTQAgmS"',
    REDIRECTS: '"http://localhost:8081/callback"',
    SCOPES: '"openid profile email roles"',
    AUDIENCES: '"https://ianrussel.auth0.com/userinfo"',
    CLIENTDOMAIN: '"ianrussel.auth0.com"'
})
