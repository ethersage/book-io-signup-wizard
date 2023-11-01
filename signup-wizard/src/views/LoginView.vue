<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="loginUser">
            <div>
                <label for="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    v-model="credentials.username"
                    required
                />
            </div>
            <div>
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="credentials.password"
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import {User, State} from '@/store';
import Vue, {defineComponent} from 'vue';
import {mapActions, ActionContext} from 'vuex';

// Define what your state looks like
// TODO: move this elsewhere

interface LoginCredentials {
    username: string;
    password: string;
}

export default defineComponent({
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions('auth', ['login']),
        loginUser() {
            console.log('loginUser');

            console.log({credentials: this.credentials});

            this.$store
                .dispatch('login', {
                    username: this.credentials.username,
                    password: this.credentials.password
                })
                // this.login(this.credentials)
                .then(() => {
                    console.log('login successful');
                    this.$router.push('/dashboard');
                })
                .catch((error) => {
                    console.log('login failed');
                    console.error('Login failed:', error);
                    alert('Login failed, please try again.');
                });
        }
    }
});
</script>
