// src/store/index.ts

import fetchBooks from '@/lib/api/fetch-books';
import fetchFavorite from '@/lib/api/fetch-favorite';
import newUser from '@/lib/api/new-user';
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
        async fetchBooks({commit}) {
            try {
                const books = await fetchBooks();
                commit('SET_BOOKS', books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        },

        async fetchFavoriteBook({state, commit}) {
            const user = state.user;
            if (user && user.name) {
                try {
                    const favorite = await fetchFavorite(user.name);

                    commit('SET_FAVORITE_BOOK', favorite);
                } catch (error) {
                    console.error('Error fetching favorite book:', error);
                }
            }
        },

        async login({commit}, username) {
            commit('SET_USER', {name: username});
        },

        logout({commit}) {
            commit('SET_USER', null);
            commit('SET_FAVORITE_BOOK', null);
        },

        async newUser(_, credentials: Credentials) {
            await newUser(credentials.username, credentials.password);
        }
    }
});

export default store;
