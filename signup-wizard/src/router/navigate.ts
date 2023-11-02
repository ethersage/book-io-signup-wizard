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
