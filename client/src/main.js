import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
// incorporate bootstrap vue for our modals
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
// use router and vuetify in this vue.app, and mount the app to manage state
new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
