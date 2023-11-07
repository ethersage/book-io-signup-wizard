<template>
    <nav>
        <span class="right" v-if="canSignup"
            ><router-link to="/signup">Signup</router-link></span
        >
        <span v-if="isLoggedIn">{{ $store.state.user.name }}</span>
        <span v-if="canLogin"><router-link to="/">Login</router-link></span>
        <span class="right" v-if="isLoggedIn"
            ><a @click.prevent="logout">Log out</a></span
        >
    </nav>
    <router-view />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {canLogin, canSignup, isLoggedIn} from './store/helpers';
import {logout} from './lib/auth';

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
            logout();
        }
    }
});
</script>

<style lang="scss">
@import './styles/reset.scss';
@import './styles/mixins.scss';

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 25px auto;
    max-width: 400px;
}

nav {
    padding: 30px 0;
    display: flex;
    align-items: center;

    * {
        text-align: left;
        @include truncate(200px);
    }

    a {
        font-weight: bold;
        color: #2c3e50;
        cursor: pointer;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

body {
    margin: auto;
    background: #cfd6ff
        url('https://cdn-edmbc.nitrocdn.com/cwhjsirvUYqaieilJZKJfDyTFhVLqZXs/assets/images/optimized/rev-a0ee7e7/www.booktoken.io/wp-content/uploads/2018/05/c922aa163c78f21d1afd19cddaf2e2d9.22-scaled.jpg') !important;
    color: #120641;
}

ul {
    text-align: left;
}

li {
    margin-top: 5px;
}

.right {
    margin-left: auto;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.button {
    padding: 10px 25px;
    font-size: 16px;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    outline: none;
}

.button:hover {
    background-color: #0056b3;
}

.button:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.button:active {
    background-color: #004085;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}

.form {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 10px auto;
    padding: 10px 20px 20px 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: whitesmoke;
}

.form > label,
.submit-button {
    margin-top: 15px;
}

.form input,
.form label,
.form select {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
}

select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-family: 'Open Sans', sans-serif; /* You can replace this with your chosen font */
    font-size: 16px;
    color: #333;
    -webkit-appearance: none; /* Removes default Chrome and Safari style */
    -moz-appearance: none; /* Removes default style Firefox */
    appearance: none; /* Remove default arrow icon in IE10 and IE11 */
    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg width="12px" height="12px" viewBox="0 0 4 5" xmlns="http://www.w3.org/2000/svg"><path fill="%23333" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
}

/* Style focus state */
select {
    border-color: #666;
    outline: none;
}

.error {
    color: red;
    margin-top: 5px;
}
.success {
    color: green;
    margin-top: 5px;
}
</style>
