import { createRouter, createWebHistory } from 'vue-router';

import HomePage from "./pages/HomePage.vue";
import CreatePost from "./pages/CreatePost.vue";
import ShowPost from "./pages/ShowPost.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/create-post',
            name: 'createPost',
            component: CreatePost,
        },
        {
            path: '/posts/:slug',
            name: 'show-post',
            component: ShowPost,
        },
        // {
        //     path: '/:patchMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound,
        // },
    ]
})

export { router };