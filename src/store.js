// store.js
import { reactive } from 'vue'

export const store = reactive({
  postsList: [],
  apiUrl: import.meta.env.VITE_POSTS_SERVER,
})
