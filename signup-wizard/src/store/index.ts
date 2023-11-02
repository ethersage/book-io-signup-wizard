// src/store/index.ts

import fetchBooks from '@/lib/fetch-books';
import newUser from '@/lib/new-user';
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

// Create a new store instance.
const store = createStore({
    state(): State {
        return {
            user: null, // This will hold the user data after a successful login
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
                    commit('SET_BOOKS', data.data.books); // Assuming the API returns an object with a books array
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        fetchFavoriteBook({state, commit}) {
            const username = state.user;
            if (username) {
                fetch(`http://localhost:9000/users/${username}/favorites`)
                    .then((response) => response.json())
                    .then((data) => {
                        commit('SET_FAVORITE_BOOK', data.data.favorites.book); // Adjust according to your API response structure
                    })
                    .catch((error) => {
                        console.error('Error fetching favorite book:', error);
                    });
            }
        },

        login({commit}, credentials) {
            return new Promise((resolve, reject) => {
                fetch('http://localhost:9000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                    .then((response) => {
                        if (!response.ok) throw new Error('Login failed');
                        return response.json();
                    })
                    .then((data) => {
                        commit('SET_USER', credentials.username);
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
