<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { store } from '../store.js';
import SinglePost from '../components/SinglePost.vue';

const getAllPosts = async () => {
    const apiUrl = import.meta.env.VITE_POSTS_SERVER;
    const postsRoute = import.meta.env.VITE_POSTS;
    try{
        const posts = await axios.get(`${apiUrl}/${postsRoute}`);
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
    <div class="flex flex-col items-center py-5 gap-y-8">
        <SinglePost 
            v-for="(post, index) in store.postsList.postsList" :key="post.id"
            :post = "post"
        />
    </div>
</template>


<style scoped>

</style>