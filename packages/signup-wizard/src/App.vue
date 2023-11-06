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
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}
body {
    line-height: 1;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
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

body {
    margin: auto;
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
    max-width: 200px;
    margin: 10px auto;
    padding: 10px 20px 20px 20px;
    border: 1px solid black;
    border-radius: 10px;
}

.form > label,
.submit-button {
    margin-top: 15px;
}

.form input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
}
</style>
