<script setup>
import { onMounted, ref } from 'vue';
import usersService from '../../services/users';
import List from '../shared/articles/List.vue';

const articles = ref([]);
onMounted(() => {
  usersService
    .allFavArticles()
    .then(res => articles.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="favourite-artilces">
    <Jumbo
      image="/images/organic-baby-clothing-375484.jpg"
      text="baby-sleeping"
    />
    <h2 class="section-title">
      Favourite Articles
    </h2>
    <List :articles="articles" />
  </section>
</template>
