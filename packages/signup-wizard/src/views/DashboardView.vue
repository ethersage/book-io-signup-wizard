<template>
    <div class="dashboard">
        <h1>Welcome, {{ $store.state.user && $store.state.user.name }}!</h1>
        <ul>
            <li
                class="book"
                :class="{'fav-book': book.id === $store.state.favoriteBookId}"
                v-for="book in $store.state.books"
                :key="book.id"
            >
                <span
                    class="fav-icon"
                    v-if="book.id === $store.state.favoriteBookId"
                >
                    ⭐️</span
                >
                <span>{{ book.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {doIfLoggedIn} from '@/router/navigate';
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
    created() {
        const store = useStore();

        doIfLoggedIn(() => {
            store.dispatch('fetchBooks');
            store.dispatch('fetchFavoriteBook');
        });
    }
});
</script>

<style scoped>
.dashboard h1 {
    text-align: left;
    white-space: nowrap; /* Prevents the text from wrapping */
    overflow: hidden; /* Ensures the overflow is hidden */
    text-overflow: ellipsis; /* Adds an ellipsis (...) after the text gets truncated */
    max-width: 300px; /* Set to the maximum width that you want for your usernames */
    display: inline-block; /* or 'block' depending on your layout */
}

.book {
    padding: 5px 20px;
}

.fav-book {
    margin-left: -25px;
}

.fav-icon {
    margin-right: 5px;
}
</style>
