<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();

const props = defineProps(['post']);

const tagsFormatter = (length, tag, index) => {
    return index < length - 1? tag.name + " - " :  tag.name
};

const deletePost = async ({slug}) => {
    const posts = import.meta.env.VITE_POSTS;
    try{
        const apiCall = await axios.delete(`${store.apiUrl}/${posts}/${slug}`)
        location.reload();
    }catch(err){
        console.error(err);
    }
}

</script>

<template>
    <div class="border rounded-md">
            <router-link :to=" { name: 'show-post', params: { slug: post.slug } }">
            <img :src="post.image? post.image : '/not-found.jpg' " :alt="post.title" class="w-80">
            <div class="p-2">
                <div class="flex justify-between items-start py-4">
                    <div>
                        <h2 class="text-2xl font-bold">{{ post.title }}</h2>
                        <p class="text-slate-700">{{ post.content }}</p>
                    </div>
                    
                    <span class="published-label" :class="{isPublished: post.published, notPublished: !post.published }" >{{ post.published? "Published" : "Not published yet" }}</span>
                </div>
                <h6>{{ post.category?.name }}</h6>
                <div v-if="post.tags.length > 0">
                    <span v-for="(tag, index) in post.tags" :key="tag.id">
                        {{ tagsFormatter(post.tags.length, tag, index) }}
                    </span>
                </div>
            </div>
        </router-link>
        <div class="flex items-center justify-between p-3">
            <router-link :to="{ name: 'edit-post', params: {slug: post.slug} }">
                <div>
                    <i class="fas fa-pen-to-square text-yellow-400 text-3xl"></i>
                </div>
            </router-link>
            <div @click="deletePost(post)" class=" cursor-pointer">
                <i class="fas fa-trash-can text-red-600 text-3xl"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.published-label{
    @apply text-white rounded-full px-2 py-1
}
.isPublished{
    @apply bg-green-600 
}

.notPublished{
    @apply bg-rose-600
}


</style>