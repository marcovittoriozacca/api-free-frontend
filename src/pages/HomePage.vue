<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { store } from '../store.js';
import SinglePost from '../components/SinglePost.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const getAllPosts = async () => {
    const apiUrl = import.meta.env.VITE_POSTS_SERVER;
    const postsRoute = import.meta.env.VITE_POSTS;
    try{
        let actualPage = route.query.page;
        if(actualPage === undefined || actualPage < 1 || isNaN(actualPage)){
            actualPage = 1;
            router.replace({ query: { ...route.query, page: actualPage } });
        }
        const posts = await axios.get(`${apiUrl}/${postsRoute}/?limit=10&page=${actualPage}`);
        store.postsList = posts.data;
    }catch(err){
        console.error(err);
    }
};
onMounted(() => {
  getAllPosts();
})


</script>

<template>
    <h1 class="text-3xl sm:text-4xl text-center py-4">API-FREE-FRONTEND</h1>
    <div class="flex flex-col items-center py-5 gap-y-8">
        <SinglePost 
            v-for="(post, index) in store.postsList.postsList" :key="post.id"
            :post = "post"
        />
    </div>
</template>


<style scoped>

</style>