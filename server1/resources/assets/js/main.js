import './bootstrap.js';


import store from './store/store.js';
import router from './router/index.js';

import navbar from './components/navbar';
import sidebar from './components/sidebar';
import contents from './components/content';
import footerComponent from './components/footer';
import ThemeColor from './components/themeColor';

Vue.filter('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY');
})
const vm = new Vue({
    delimiters: ['<tai','tai>'],
    el: "#app",
    router,
    store,
    components: {
		navbar,
		sidebar,
		contents,
		footerComponent,
		ThemeColor
	},
})
console.log(vm, "vm")
