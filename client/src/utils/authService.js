import auth0 from 'auth0-js'
import Event from 'events'
import Router from 'vue-router'
var router = new Router({
    mode: 'history'
})

export default class AuthService {
    authenticated = this.isAuthenticated()
    authNotifier = new Event()

    constructor () {
        this.login = this.login.bind(this)
        this.setSession = this.setSession.bind(this)
        this.logout = this.logout.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
    }
    auth0 = new auth0.WebAuth({
        domain: 'ianrussel.auth0.com',
        clientID: '51re13he1en9TTW0JsLVCPYlwuTQAgmS',
        redirectUri: 'http://localhost:8081/callback',
        audience: 'vue_cli',
        responseType: 'token id_token',
        scope: 'openid email profile'
    })

    login () {
        this.auth0.authorize()
    }

    handleAuthentication () {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
                this.auth0.client.userInfo(authResult.accessToken, function (err, user) {
                    localStorage.setItem('user_details', user)
                    console.log(user)
                    console.log(err)
                })
                router.go('/')
            } else if (err) {
                router.go('/')
                console.log(err)
            }
        })
    }
    getUser () {
        return JSON.stringify(localStorage.getItem('user_details'))
    }
    setSession (authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        )
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
        this.authNotifier.emit('authChange', { authenticated: true })
    }

    logout () {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        this.userProfile = null
        this.authNotifier.emit('authChange', false)
        // navigate to the home route
        router.replace('home')
    }

    isAuthenticated () {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
    }
}
