<template>
    <nav>
        <span v-if="!isSignupRoute && !$store.state.user"
            ><router-link to="/signup">Signup</router-link></span
        >
        <span v-if="$store.state.user">{{ $store.state.user.name }}</span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Log out</a></span>
        <span v-if="canLogin"><router-link to="/">Login</router-link></span>
    </nav>
    <router-view />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {goHome} from './router/navigate';

export default defineComponent({
    name: 'AppView',
    computed: {
        isLoggedIn(): boolean {
            return !!this.$store.state.user;
        },

        isSignupRoute() {
            return this.$route.name === 'signup';
        },

        canLogin(): boolean {
            return !this.$store.state.user && this.$route.name !== 'home';
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            goHome();
        }
    }
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
