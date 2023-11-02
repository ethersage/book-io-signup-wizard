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

        async login({commit}, credentials) {
            try {
                const data = await login(
                    credentials.username,
                    credentials.password
                );

                commit('SET_USER', {name: credentials.username});
                return data;
            } catch (error) {
                console.error(error);
            }
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
