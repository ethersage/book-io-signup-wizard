import store from '@/store';
import router from '.';
import {RouteLocationRaw} from 'vue-router';
import {getUser} from '@/lib/auth/storage';

export interface GoHomeArgs {
    replace: boolean;
    success?: boolean;
}

export function goHome(args = {replace: false, success: undefined}) {
    const routerArgs: RouteLocationRaw = {name: 'home'};

    if (args.success !== undefined) {
        routerArgs.query = {signup: String(args.success)};
    }

    if (args.replace) {
        router.replace(routerArgs);
    } else {
        router.push(routerArgs);
    }
}

export function goToDashboard() {
    router.push({name: 'dashboard'});
}

export function doIfLoggedIn(action: () => void) {
    if (!store.state.user) {
        goHome(); // Navigate to login
    } else {
        action();
    }
}

export function goToDashboardIfLoggedIn() {
    if (store.state.user) {
        goToDashboard();
    }
}
