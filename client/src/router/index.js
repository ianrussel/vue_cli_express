import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

import Callback from '@/components/callback'
// Views
// import Dashboard from '@/views/Dashboard'
// import Charts from '@/views/Charts'
import Widgets from '@/views/Widgets'

// Views - Components
import Cheats from '@/views/components/Cheats'
import Cheater from '@/views/components/Cheater'
import Forms from '@/views/components/Forms'
import SearchResults from '@/views/components/SearchResults'
// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

Vue.use(Router)

export default new Router({
    mode: 'history', // Demo is living in GitHub.io, so required!
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: Full,
            children: [
                {
                    path: 'dashboard',
                    name: 'Cheats',
                    component: Cheats
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'components',
                    redirect: 'dashboard',
                    name: 'Components',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'cheater',
                            name: 'Cheater',
                            component: Cheater
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'search-results',
                            name: 'SearchResults',
                            component: SearchResults
                        }
                    ]
                }
            ]
        },
        {
            path: '/callback',
            component: Callback
        },
        {
            path: '/components/search-results',
            redirect: '/components/search-results',
            component: SearchResults
        },
        {
            path: 'components/cheater',
            name: 'Cheater',
            component: Cheater
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
})
