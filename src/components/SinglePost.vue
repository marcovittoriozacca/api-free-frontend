<script setup>

const props = defineProps(['post']);



</script>

<template>
    <div class="border rounded-md">
        <img :src="post.image? post.image : '/not-found.jpg' " :alt="post.title" class="w-80">
        <div class="flex justify-between items-start px-2 py-4">
            <div>
                <h2 class="text-2xl font-bold">{{ post.title }}</h2>
                <!-- <p class="text-slate-700">{{ post.content }}</p> -->
            </div>
            
            <span class="published-label" :class="{isPublished: post.published, notPublished: !post.published }" >{{ post.published? "Published" : "Not published yet" }}</span>
        </div>
        <h6>{{ post.category }}</h6>
        <h6>{{ post.userId }}</h6>
        <div>
            <span v-for="(tag, index) in post.tags" :key="tag.id">
                {{ tag }}
            </span>
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