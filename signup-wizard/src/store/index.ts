// src/store/index.ts

import {createStore} from 'vuex';

export interface User {
    name: string;
}

export interface State {
    user: User | null; // Assuming you have a User type defined somewhere
}

// Create a new store instance.
const store = createStore({
    state() {
        return {
            user: null // This will hold the user data after a successful login
        };
    },
    mutations: {
        SET_USER(state: State, user: User) {
            state.user = user;
        }
    },
    actions: {
        login({commit}, credentials) {
            console.log('logging in');
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
                        commit('SET_USER', data.user);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
});

export default store;
