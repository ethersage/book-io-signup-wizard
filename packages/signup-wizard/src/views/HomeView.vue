<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="loginUser">
            <div class="form">
                <label for="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    v-model="credentials.username"
                    required
                    placeholder="Username"
                />
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="credentials.password"
                    required
                    placeholder="Password"
                />
                <button class="button submit-button" type="submit">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {goToDashboard, goToDashboardIfLoggedIn} from '@/router/navigate';
import {defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        return {store};
    },
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        async loginUser() {
            try {
                await this.store.dispatch('login', {
                    username: this.credentials.username,
                    password: this.credentials.password
                });

                goToDashboard();
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed, please try again.');
            }
        }
    },
    created() {
        goToDashboardIfLoggedIn();
    }
});
</script>

<style scoped></style>
