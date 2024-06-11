<script setup>
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';
import { onMounted, ref } from 'vue';

import axios from 'axios';
const route = useRoute();
const router = useRouter();

let categories = ref([]);
let tagsList = ref([]);
let post = ref([]);

const title = ref("");
const content = ref("");
const published = ref(false);
const categoryId = ref(undefined);
const tags = ref([]);

const setPostFiled = async post => {
    try{
        title.value = post.title;
        content.value = post.content;
        published.value = post.published;
        categoryId.value = post.categoryId;
        tags.value = post.tags.map(e => e.id);
    }catch(err){
        console.error(err);
    }
};

const getCategories = async () => {
    const categoriesEndpoint = import.meta.env.VITE_CATEGORIES;

    try{
        const apiCall = await axios.get(`${store.apiUrl}/${categoriesEndpoint}`);
        return apiCall.data.categories

    }catch(err){
        console.error(err);
    }
}
const getTags = async () => {
    const tagsEndpoint = import.meta.env.VITE_TAGS;

    try{
        const apiCall = await axios.get(`${store.apiUrl}/${tagsEndpoint}`);
        return apiCall.data.tags

    }catch(err){
        console.error(err);
    }
}

const getTagsAndCategories = async () => {
    tagsList.value = await getTags();
    categories.value = await getCategories();
}

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

const updatePost = async () => {
    const posts = import.meta.env.VITE_POSTS;
    const param = route.params.slug;
    try{
        const updatedData = {
            title: title.value,
            content: content.value,
            published: published.value,
            categoryId: categoryId.value,
            tags: tags.value,
        }
        const apiCall = await axios.put(`${store.apiUrl}/${posts}/${param}`, updatedData);
        router.push({ name: 'home'})
    }catch(err){
        console.error(err);
    }

}

onMounted(async () => {
    await getTagsAndCategories()
    await getPost();
    await setPostFiled(post._value);
})

</script>

<template>
    
    <div class="h-screen grid content-center">
        <form  @submit.prevent="submit" action="" class=" bg-neutral-200 rounded-md">
            <div class="container p-5">
                <div class="mb-3 flex flex-col">
                    <label for="title" class="mb-2">Post Title</label>
                    <input type="text" id="title" name="title" placeholder="ex: Post title" class="rounded-sm px-3 py-2" v-model="title">
                </div>
        
                <div class="mb-3 flex flex-col">
                    <label for="content" class="mb-2">Post Content</label>
                    <textarea name="content" id="content" rows="5" class="rounded-sm px-3 py-2" placeholder="Content of your post..." v-model="content"></textarea>
                </div>
        
                <div class="mb-3 flex gap-x-2 items-center">
                    <label for="published">Published Post</label>
                    <input type="checkbox" name="published" id="published" :value=true v-model="published"> <small class="opacity-50">(By checking this, the post will be automatically set as published)</small>
                </div>
        
                <div class="mb-3">
                    <h3 class="mb-1">Category</h3>
                    <div class="flex flex-wrap gap-x-4 bg-white rounded-sm px-3 py-2">
                        <div v-for="(category, index) in categories">
                            <div class="flex items-center gap-x-2">
                                <label for="categoryId">{{ category.name }}</label>
                                <input type="radio" name="categoryId" :key="category.id" :id="category.id" :value="category.id" v-model="categoryId">
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="mb-5">
                    <h3 class="mb-2">Tags</h3>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="(tag, index) in tagsList" :key="tag.id">
                            <div class="flex items-center gap-x-2 p-2 bg-white rounded-sm">
                                <label :for="tags[tag.id]">{{ tag.name }}</label>
                                <input type="checkbox" name="tags[]" :id="tags[tag.id]" :value="tag.id" v-model="tags">
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="mb-3">
                    <button type="submit" @click="updatePost()" class="text-white bg-sky-500 px-5 py-2 rounded-lg">Update Post</button>
                </div>
            </div>
        
        </form>

    </div>

</template>

<style scoped>

</style>