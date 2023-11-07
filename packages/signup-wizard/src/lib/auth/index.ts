import {useStore} from 'vuex';
import apiLogin from '../api/login';
import {clearUser, getUser, setUser} from './storage';
import {goHome, goToDashboard} from '@/router/navigate';
import store from '@/store';

export async function performLogin(username: string, password: string) {
    // api login
    await apiLogin(username, password);

    // persist login user
    setUser(username);

    store.dispatch('login', username);

    goToDashboard();
}

export async function hydrateLogin() {
    const localUsername = getUser();

    if (!localUsername) {
        return goHome();
    }

    store.dispatch('login', localUsername);
    store.dispatch('fetchBooks');
    store.dispatch('fetchFavoriteBook');
}

export async function logout() {
    clearUser();
    store.dispatch('logout');
    goHome();
}
