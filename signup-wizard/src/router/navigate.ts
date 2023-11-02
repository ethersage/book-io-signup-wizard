import router from '.';

export function goHome() {
    router.push({name: 'home'});
}

export function goToDashboard() {
    router.push({name: 'dashboard'});
}
