import router from '@/router';
import store, {Book} from '.';

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

export function dispatchSetBooks(books: Book) {
    store.dispatch('setBooks', books);
}

export function dispatchSetFavorite(favoriteBookId: string) {
    store.dispatch('setFavoriteBook', favoriteBookId);
}

export function dispatchLogout() {
    store.dispatch('logout');
}
