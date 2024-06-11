<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { store } from '../store.js';
import SinglePost from '../components/SinglePost.vue';

const getAllPosts = async () => {
    try{
        const posts = await axios.get("http://localhost:3000/posts");
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
    <div class="flex flex-col items-center">
        <SinglePost 
            v-for="(post, index) in store.postsList.postsList" :key="post.id"
            :post = "post"
        />
    </div>
</template>


<style scoped>

</style>