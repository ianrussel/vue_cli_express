<template>
    <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
            <span v-show="isLoggedIn()">hello {{user.nickname}} </span><img :src="user.picture" class="img-avatar" :alt="user.nickname"  v-show="isLoggedIn()">
            <button class="btn btn btn-primary btn-margin" v-show="!isLoggedIn()" @click="handleLogin()">Login</button>
        </template>
        <b-dropdown-header tag="div" class="text-center" v-show="isLoggedIn()"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item v-show="isLoggedIn()"><i class="fa fa-envelope-o"></i> Messages<b-badge variant="success">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item v-show="isLoggedIn()"><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-show="isLoggedIn()"><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>
        <b-dropdown-item v-show="isLoggedIn()" @click="handleLogout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
    import { isLoggedIn, login, logout, userInfo } from '../utils/auth'
    export default {
        name: 'header-dropdown',
        data: () => {
            return {
                itemsCount: 0,
                user: '',
                roles: ''
            }
        },
        props: ['image'],
        mounted () {
            if (isLoggedIn()) {
                this.userInfo()
            }
        },
        methods: {
            handleLogin () {
                login()
            },
            handleLogout () {
                logout()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            userInfo () {
                userInfo().then((result) => {
                    this.user = result
                    console.log(this.user, 'user info')
                    const roles = this.user['https://ianrussel:auth0:com/roles']
                    this.roles = roles[0]
                    // set the role of current user
                    localStorage.setItem('user_roles', this.roles)
                }).catch((err) => {
                    console.log(err.toString())
                })
            }
        }
    }
</script>
