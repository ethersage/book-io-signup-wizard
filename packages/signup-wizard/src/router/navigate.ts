import store from '@/store';
import router from '.';

export function goHome(replace = false) {
    if (replace) {
        router.replace({name: 'home'});
    } else {
        router.push({name: 'home'});
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
