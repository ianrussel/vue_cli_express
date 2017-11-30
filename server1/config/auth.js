// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '561258347910-ujm8nm3kc101heqlj1eo6oahpt8j7s48.apps.googleusercontent.com',
        'clientSecret'  : 'skIBuOwbqNHZCMfcY-a8VfAU clientSecret',
        'callbackURL'   : 'http://localhost:9000/auth/google/callback'
    }

};
