import router from '@/router';
import store from '.';

export function canLogin() {
    return !store.state.user && router.currentRoute.value.name !== 'home';
}

export function canSignup() {
    return !isSignupRoute() && !isLoggedIn();
}

export function isLoggedIn() {
    return !!store.state.user;
}

export function isSignupRoute() {
    return router.currentRoute.value.name === 'signup';
}

export function dispatchLogin(username: string) {
    store.dispatch('login', username);
}

export function dispatchFetchBooks() {
    store.dispatch('fetchBooks');
}

export function dispatchFetchFavorite() {
    store.dispatch('fetchFavoriteBook');
}

export function dispatchLogout() {
    store.dispatch('logout');
}
