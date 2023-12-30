import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/blog/All.vue';
import AllCategories from '../components/administration/category/All.vue';
import CreateCategory from '../components/administration/category/Create.vue';
import CreateArticle from '../components/administration/article/Create.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/administration/category', component: AllCategories },
  { path: '/administration/category/create', component: CreateCategory },
  { path: '/administration/article/create', component: CreateArticle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
