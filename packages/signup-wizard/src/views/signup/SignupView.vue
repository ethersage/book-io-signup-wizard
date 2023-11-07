<!-- SignupForm.vue -->
<template>
    <div class="signup-view">
        <h1>Signup</h1>
        <StepOne v-if="step === 1" @advance="handleUserPass" />
        <StepTwo v-if="step === 2" @advance="handleChooseFavorite" />
    </div>
</template>

<script lang="ts">
import {goHome} from '@/router/navigate';
import signup from '@/lib/api/signup';

import UserPassStep from './UserPassStepView.vue';
import ChooseFavorite from './ChooseFavoriteView.vue';
import {getBooks} from '@/lib/books';

import type {Credentials} from '@/store';
import {defineComponent} from 'vue';

export default defineComponent({
    components: {StepOne: UserPassStep, StepTwo: ChooseFavorite},
    data() {
        return {
            step: 1 as number,
            username: '' as string,
            password: '' as string,
            favoriteBookId: '' as string,
            books: [] as Array<{
                id: number;
                title: string;
                author: string;
                description: string;
                cover_url: string;
            }>
        };
    },
    methods: {
        handleUserPass(data: Credentials) {
            this.username = data.username;
            this.password = data.password;

            this.step++;
        },
        async handleChooseFavorite(data: {favoriteBookId: string}) {
            // TODO: check if user has been created first

            this.favoriteBookId = data.favoriteBookId;

            try {
                await signup(this.username, this.password, data.favoriteBookId);

                goHome({replace: true, success: true});
            } catch (error) {
                console.error('Error during signup:', error);
                goHome({replace: true, success: false});
            }
        }
    },
    created() {
        getBooks();
    }
});
</script>
