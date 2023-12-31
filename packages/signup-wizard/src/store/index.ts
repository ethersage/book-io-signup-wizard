// src/store/index.ts

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
        async setBooks({commit}, books) {
            commit('SET_BOOKS', books);
        },

        async setFavoriteBook({commit}, favoriteBookId) {
            commit('SET_FAVORITE_BOOK', favoriteBookId);
        },

        async login({commit}, username) {
            commit('SET_USER', {name: username});
        },

        logout({commit}) {
            commit('SET_USER', null);
            commit('SET_FAVORITE_BOOK', null);
        }
    }
});

export default store;
