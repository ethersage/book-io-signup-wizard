import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            // import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
            import(
                /* webpackChunkName: "signup" */ '../views/signup/SignupView.vue'
            )
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '../views/DashboardView.vue'
            )
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
