import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Router from 'vue-router'

const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'
const USER_DETAILS = 'user_details'

const CLIENT_ID = process.env.CLIENTID
const CLIENT_DOMAIN = process.env.CLIENTDOMAIN

const REDIRECT = process.env.REDIRECTS
const SCOPE = process.env.SCOPES
const AUDIENCE = process.env.AUDIENCES

const router = new Router({
    mode: 'history'
})

const auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
})
export function login () {
    auth.authorize({
        responseType: 'token id_token',
        redirectUri: REDIRECT,
        audience: AUDIENCE,
        scope: SCOPE
    })
}
export function userInfo () {
    const puke = getAccessToken()
    return new Promise((resolve) => {
        auth.client.userInfo(puke, (err, user) => {
            if (err) {
                console.log(err.toString())
            }
            resolve(user)
        })
    })
}
export function userRole () {
    const puke = getAccessToken()
    return new Promise((resolve) => {
        auth.client.userInfo(puke, (err, user) => {
            if (err) {
                console.log(err.toString())
            }
            const role = user['https://ianrussel:auth0:com/roles']
            resolve(role[0])
        })
    })
}
export function logout () {
    clearIdToken()
    clearAccessToken()
    clearUserDetailsToken()
    router.go('/')
}

export function requireAuth (to, from, next) {
    if (!isLoggedIn()) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}
// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}
export function getIdToken () {
    return localStorage.getItem(ID_TOKEN_KEY)
}
export function getAccessToken () {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}
export function getUserDetail () {
    return localStorage.getItem('user_details')
}
function clearIdToken () {
    localStorage.removeItem(ID_TOKEN_KEY)
}
function clearAccessToken () {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}
function clearUserDetailsToken () {
    localStorage.removeItem(USER_DETAILS)
}
// Get and store access_token in local storage
export function setAccessToken () {
    let accessToken = getParameterByName('access_token')
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}
// Get and store id_token in local storage
export function setIdToken () {
    let idToken = getParameterByName('id_token')
    localStorage.setItem(ID_TOKEN_KEY, idToken)
}
export function isLoggedIn () {
    const idToken = getIdToken()
    return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp) {
        return null
    }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

function isTokenExpired (token) {
    const expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}
