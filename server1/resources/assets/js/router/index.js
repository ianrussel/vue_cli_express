import VueRouter from 'vue-router';

import AddVue from '../components/code/addVue';
import Code from '../components/code/Code';
import Home from '../components/code/Home';
import Google from '../components/code/Google';
import Bug from '../components/code/Bug';
const NotFound = { template: '<div>Ariba Ariba Ariba Not Found</div>' };

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/addVue',
        component: AddVue
        //beforeEnter: Auth.requireAuth
    },
    {
        path: '/reportBug',
        component: Bug
    },
    {
        path: '/puta/:name',
        component: Code
    },
    {
        path: '/google',
        component: Google
    },
    {
        path: '*',
        component: NotFound
    }

]
const router = new VueRouter({
    base: '/app',
    mode: 'history',
    routes
});

export default router
