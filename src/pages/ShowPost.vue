<script setup>
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';
import { onMounted, ref } from 'vue';

import axios from 'axios';
const route = useRoute();
const router = useRouter();

const post = ref([]);

const getPost = async () => {
    const posts = import.meta.env.VITE_POSTS;
    const param = route.params.slug;
    try{
        const apiCall = await axios.get(`${store.apiUrl}/${posts}/${param}`);
        post.value = apiCall.data.post;

    }catch(err){
        console.error(err);
    }
}

onMounted(() => {
    getPost();
})

</script>

<template>
    <div class="py-10">
        <h1 class="text-3xl font-bolder uppercase mb-5">{{ post.title }}</h1>
        <div class="flex gap-x-3">
            <figure class="rounded overflow-hidden max-w-80">
                <img :src="post.image? post.image : '/not-found.jpg' " :alt="post.title" class="w-full h-auto">
            </figure>
            <div>
                <div v-if="post.category">
                    <div class="text-2xl mb-3">
                        {{ post.category.name }}
                    </div>
                </div>
                <div v-else>
                    <h2>This post doesn't belongs to any category yet</h2>
                </div>
    
                <div v-if="post.tags && post.tags.length > 0" class="flex gap-x-3">
                    <div v-for="(tag, index) in post.tags" :key="tag.id">
                        <span class="p-3 bg-gray-500 text-white rounded-sm">{{ tag.name }}</span>
                    </div>
                </div>
                <div v-else>
                    <h2>This post doesn't have any tag yet</h2>
                </div>
            </div>
        </div>
        <div class="bg-gray-500 text-white p-5 my-5">
            <p>{{ post.content }}</p>
        </div>
    </div>
</template>

<style scoped>
</style>