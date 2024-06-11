<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const props = defineProps(['post']);

const tagsFormatter = (length, tag, index) => {
    return index < length - 1? tag.name + " - " :  tag.name
};


</script>

<template>
    <router-link :to=" { name: 'show-post', params: { slug: post.slug } }">
        <div class="border rounded-md">
            <img :src="post.image? post.image : '/not-found.jpg' " :alt="post.title" class="w-80">
            <div class="flex justify-between items-start px-2 py-4">
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