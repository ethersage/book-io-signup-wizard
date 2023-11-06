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
                <button class="button login-button" type="submit">Login</button>
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

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 200px;
    margin: 10px auto;
    padding: 10px 20px 20px 20px;
    border: 1px solid black;
    border-radius: 10px;
}

.form > label,
.login-button {
    margin-top: 15px;
}

.form input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
}
</style>
