// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VuejsDialog from 'vuejs-dialog'
import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/css/index.css'

Vue.use(BootstrapVue)
Vue.use(VuejsDialog)
Vue.use(Tooltip)

Vue.prototype.bus = new Vue()
Vue.prototype.axios = Axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
