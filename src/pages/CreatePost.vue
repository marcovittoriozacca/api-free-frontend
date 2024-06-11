<script setup>
import { ref, onMounted } from 'vue';
import { store } from '../store';
import axios from 'axios';

const title = ref("");
const content = ref("");
const published = ref(false);
const categoryId = ref(undefined);
const tags = ref([]);

let categoriesList = ref([]);
let tagsList = ref([]);

const getAllCategories = async () => {
    try{
        const categories = import.meta.env.VITE_CATEGORIES;
        const allCategoriesApiCall = await axios.get(`${store.apiUrl}/${categories}`);
        categoriesList.value = allCategoriesApiCall.data.categories;
    }catch(err){
        console.error(err);
    }
}
const getAllTags = async () => {
    try{
        const tags = import.meta.env.VITE_TAGS;
        const allTagsApiCall = await axios.get(`${store.apiUrl}/${tags}`);
        tagsList.value = allTagsApiCall.data.tags;
    }catch(err){
        console.error(err);
    }
}

const createPost = async () => {
    const posts = import.meta.env.VITE_POSTS;

    try{
        const apiBody = {
            title: title.value,
            content: content.value,
            published: published.value,
            categoryId: categoryId.value,
            tags: tags.value,
        }
        const apiCall = await axios.post(`${store.apiUrl}/${posts}`, apiBody);
    }catch(err){
        console.error(err);
    }
} 

onMounted(() => {
  getAllCategories();  
  getAllTags();
})

</script>

<template>
    <div class="h-screen grid content-center">
        <form  @submit.prevent="submit" action="" class=" bg-neutral-200 rounded-md">
            <div class="container p-5">
                <div class="mb-3 flex flex-col">
                    <label for="title" class="mb-2">Post Title</label>
                    <input type="text" id="title" name="title" placeholder="ex: Post title" v-model="title" class="rounded-sm px-3 py-2">
                </div>
        
                <div class="mb-3 flex flex-col">
                    <label for="content" class="mb-2">Post Content</label>
                    <textarea name="content" id="content" rows="5" v-model="content" class="rounded-sm px-3 py-2" placeholder="Content of your post..."></textarea>
                </div>
        
                <div class="mb-3 flex gap-x-2 items-center">
                    <label for="published">Published Post</label>
                    <input type="checkbox" name="published" id="published" :value=true v-model="published"> <small class="opacity-50">(By checking this, the post will be automatically set as published)</small>
                </div>
        
                <div class="mb-3">
                    <h3 class="mb-1">Category</h3>
                    <div class="flex flex-wrap gap-x-4 bg-white rounded-sm px-3 py-2">
                        <div v-for="(category, index) in categoriesList">
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
                                <input type="checkbox" name="tags[]" :id="tags[tag.id]" :value="tag.id" v-model="tags" che>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="mb-3">
                    <button type="submit" @click="createPost()" class="text-white bg-sky-500 px-5 py-2 rounded-lg">Create Post</button>
                </div>
            </div>
        
        </form>

    </div>

    

</template>


<style scoped>

</style>