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
import {defineComponent} from 'vue';
import {mapActions, useStore} from 'vuex';

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
        ...mapActions('auth', ['login']),
        loginUser() {
            this.store
                .dispatch('login', {
                    username: this.credentials.username,
                    password: this.credentials.password
                })
                .then(() => {
                    this.$router.push('/dashboard');
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                    alert('Login failed, please try again.');
                });
        }
    },
    created() {
        if (this.$store.state.user) {
            this.$router.push({name: 'dashboard'});
        }
    }
});
</script>
