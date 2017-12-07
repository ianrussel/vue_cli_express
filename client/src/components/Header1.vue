<template>
    <header class="app-header navbar">
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            <span class="navbar-toggler-icon"></span>
        </button>
        <b-link class="navbar-brand" to="#">Cheats</b-link>
        <button class="btn btn-danger log" v-if="!authenticated" @click="login()">Login</button>
        <button class="btn btn-info log" v-if="authenticated" @click="logout()">Log In</button>
        <!-- <button class="btn btn-danger log" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" @click="handleLogin()">Log In</button> -->
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
    import AuthService from '../utils/authService'

    const auth = new AuthService()

    const { login, logout, authenticated, authNotifier, getUser } = auth

    export default {
        name: 'app',
        data () {
            authNotifier.on('authChange', authState => {
                this.authenticated = authState.authenticated
            })
            return {
                auth,
                authenticated
            }
        },
        mounted () {
            this.getUser()
        },
        methods: {
            login,
            logout,
            getUser
        }
    }
</script>
