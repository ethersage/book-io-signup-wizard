<template>
    <div class="dashboard">
        <h1>Welcome, {{ $store.state.user }}!</h1>
        <!-- <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.title }}
                <span v-if="book.id === favoriteBookId">⭐️</span>
            </li>
        </ul> -->
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
    name: 'DashboardView',
    data() {
        return {
            books: [],
            favoriteBookId: null
        };
    },
    // computed: {
    //     username() {
    //         // Assuming the username is stored in the Vuex store after login
    //         return this.$store.state.user?.name;
    //     },
    //     books() {
    //         return this.$store.state.books;
    //     },
    //     favoriteBookId() {
    //         return this.$store.state.favoriteBookId;
    //     }
    // },
    created() {
        // this.fetchBooks();
        // this.fetchFavoriteBook();
        this.$store.dispatch('fetchBooks');
        this.$store.dispatch('fetchFavoriteBook');
    },
    methods: {
        fetchBooks() {
            // Replace with the actual API call
            fetch('http://localhost:9000/books')
                .then((response) => response.json())
                .then((data) => {
                    this.books = data;
                });
        },
        fetchFavoriteBook() {
            // Replace 'currentUsername' with the actual username variable
            let currentUsername = this.$store.state.user?.name;
            if (currentUsername) {
                fetch(
                    `http://localhost:9000/users/${currentUsername}/favorites`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        this.favoriteBookId = data.favorites.book;
                    });
            }
        }
    }
});
</script>

<style scoped>
/* Add styles for your dashboard here */
</style>
