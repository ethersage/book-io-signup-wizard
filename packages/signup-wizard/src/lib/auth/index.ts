import {
    dispatchFetchBooks,
    dispatchFetchFavorite,
    dispatchLogin,
    dispatchLogout
} from '@/store/helpers';
import apiLogin from '../api/login';
import {clearUser, getUser, setUser} from './storage';
import {goHome, goToDashboard} from '@/router/navigate';

export async function performLogin(username: string, password: string) {
    // api login
    await apiLogin(username, password);

    // persist login user
    setUser(username);

    // setup the store
    dispatchLogin(username);

    // put them at the right place
    goToDashboard();
}

export async function hydrateLogin() {
    // get the stored user
    const localUsername = getUser();

    // if no stored user, then go home
    if (!localUsername) {
        return goHome();
    }

    // setup the store and fetch
    dispatchLogin(localUsername);
    dispatchFetchBooks();
    dispatchFetchFavorite();
}

export async function logout() {
    // clear out storage
    clearUser();

    // clear the store
    dispatchLogout();

    // navigate them to login
    goHome();
}
