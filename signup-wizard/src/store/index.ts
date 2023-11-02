// src/store/index.ts

import fetchBooks from '@/api/fetch-books';
import fetchFavorite from '@/api/fetch-favorite';
import login from '@/api/login';
import newUser from '@/api/new-user';
import {createStore} from 'vuex';

export interface Credentials {
    username: string;
    password: string;
}

export interface User {
    name: string;
}

export interface Book {
    id: number;
    title: string;
}

export interface State {
    user: User | null;
    books: Book[];
    favoriteBookId: string | null;
}

const store = createStore({
    state(): State {
        return {
            user: null,
            books: [],
            favoriteBookId: null
        };
    },
    mutations: {
        SET_USER(state: State, user: User) {
            state.user = user;
        },
        SET_BOOKS(state, books) {
            state.books = books;
        },
        SET_FAVORITE_BOOK(state, bookId) {
            state.favoriteBookId = bookId;
        }
    },
    actions: {
        fetchBooks({commit}) {
            fetchBooks()
                .then((data) => {
                    commit('SET_BOOKS', data.data.books);
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        fetchFavoriteBook({state, commit}) {
            const user = state.user;
            if (user && user.name) {
                fetchFavorite(user.name).then((data) => {
                    commit('SET_FAVORITE_BOOK', data.data.favorites.book);
                });
            }
        },

        login({commit}, credentials) {
            return new Promise((resolve, reject) => {
                login(credentials.username, credentials.password)
                    .then((data) => {
                        commit('SET_USER', {name: credentials.username});
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        logout({commit}) {
            commit('SET_USER', null);
            commit('SET_FAVORITE_BOOK', null);
        },

        newUser({commit}, credentials: Credentials) {
            newUser(credentials.username, credentials.password);
        }
    }
});

export default store;
