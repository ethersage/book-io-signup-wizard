<template>
    <nav>
        <span v-if="canSignup"
            ><router-link to="/signup">Signup</router-link></span
        >
        <span v-if="isLoggedIn">{{ $store.state.user.name }}</span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Log out</a></span>
        <span v-if="canLogin"><router-link to="/">Login</router-link></span>
    </nav>
    <router-view />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {goHome} from './router/navigate';
import {canLogin, canSignup, isLoggedIn} from './store/helpers';

export default defineComponent({
    name: 'AppView',
    computed: {
        canLogin() {
            return canLogin();
        },

        canSignup() {
            return canSignup();
        },

        isLoggedIn(): boolean {
            return isLoggedIn();
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
