<script setup>

const props = defineProps(['post']);



</script>

<template>
    <div class="border">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <img :src="post.image? post.image : '/not-found.jpg' " :alt="post.title" class="w-80">
        <span>{{ post.published? "Published" : "Not published yet" }}</span>
        <h6>{{ post.category }}</h6>
        <h6>{{ post.userId }}</h6>
        <div>
            <span v-for="(tag, index) in post.tags" :key="index">
                {{ tag }}
            </span>
        </div>
    </div>
</template>

<style scoped>

</style>