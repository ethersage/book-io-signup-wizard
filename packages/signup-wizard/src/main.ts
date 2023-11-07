import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import autofocusDirective from './directives/autofocus';

createApp(App)
    .use(store)
    .use(router)
    .directive('autofocus', autofocusDirective)
    .mount('#app');
