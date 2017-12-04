<template>
    <header class="app-header navbar">
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            <span class="navbar-toggler-icon"></span>
        </button>
        <b-link class="navbar-brand" to="#">Cheats</b-link>
        <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
            <span class="navbar-toggler-icon"></span>
        </button>
        <b-navbar-nav class="d-md-down-none">
            <b-nav-item class="px-3">Dashboard</b-nav-item>
            <b-nav-item class="px-3">Users</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <HeaderDropdown/>
        </b-navbar-nav>
    </header>
</template>
<script>
    import HeaderDropdown from './HeaderDropdown.vue'
    import { isLoggedIn, login, logout } from '../utils/auth'
    export default {
        name: 'header',
        components: {
            HeaderDropdown
        },
        methods: {
            sidebarToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            },
            handleLogin () {
                login()
            },
            handleLogout () {
                logout()
            },
            isLoggedIn () {
                return isLoggedIn()
            }
        }
    }
</script>
