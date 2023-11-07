import {useStore} from 'vuex';
import apiLogin from '../api/login';
import {getUser, setUser} from './storage';
import {goToDashboard} from '@/router/navigate';
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
    const store = useStore();

    const localUsername = getUser();

    if (!localUsername) {
        return;
    }

    store.dispatch('login', localUsername);
    store.dispatch('fetchBooks');
    store.dispatch('fetchFavoriteBook');
}
