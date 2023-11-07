<!-- SignupForm.vue -->
<template>
    <div class="signup-view">
        <h1>Signup</h1>
        <StepOne v-if="step === 1" @advance="handleUserPass" />
        <StepTwo v-if="step === 2" @advance="handleChooseFavorite" />
    </div>
</template>

<script lang="ts">
import {useStore} from 'vuex';

import {goHome} from '@/router/navigate';
import signup from '@/api/signup';

import StepOne from './UserPassStepView.vue';
import StepTwo from './ChooseFavoriteView.vue';

export default {
    components: {StepOne, StepTwo},
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
        handleUserPass(data) {
            this.username = data.username;
            this.password = data.password;

            console.log(this.username, this.password);

            // Update shared state
            this.step++;
        },
        async handleChooseFavorite(data) {
            // TODO: check if user has been created first

            this.favoriteBookId = data.favoriteBookId;

            try {
                await signup(this.username, this.password, this.favoriteBookId);

                goHome({replace: true, success: true});
            } catch (error) {
                console.error('Error during signup:', error);
            }
        }
    },
    created() {
        const store = useStore();
        store.dispatch('fetchBooks');
    }
};
</script>
