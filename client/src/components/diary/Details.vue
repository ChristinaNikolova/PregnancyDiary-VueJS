<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import diariesService from '../../services/diaries';
import forms from '../../utils/helpers/forms';
import AllWeeks from './week/All.vue';
import ListWeeks from './week/List.vue';
import WrapperBaby from './baby/Wrapper.vue';

const route = useRoute();
const diaryId = route.params.id;
const diary = ref({});

onMounted(() => {
  diariesService
    .getById(diaryId)
    .then((res) => {
      diary.value = res;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="diary-details">
    <Jumbo
      image="/images/personalised+pregnancy+journal.jpg"
      text="diary"
    />
    <h2 class="section-title">
      {{ diary.title }}
    </h2>
    <p class="diary-details-description">
      {{ diary.description }}
    </p>
    <WrapperBaby :diary-id="diary.id" :is-baby-born="diary.isBabyBorn" :baby="diary.baby" />
    <section class="diary-details-info">
      <div class="diary-details-info-positive-test-date">
        Positive Test: {{ diary.positiveTestDate }}
      </div>
      <div class="diary-details-info-due-date">
        Due Date: {{ diary.dueDate }}
      </div>
      <div class="diary-details-info-gender">
        Gender: <br>{{ diary.gender }}
      </div>
    </section>
    <AllWeeks :weeks="diary.weeks">
      <template #first>
        <ListWeeks title="First" :weeks="diary.weeks" />
      </template>
      <template #second>
        <ListWeeks title="Second" :weeks="diary.weeks" />
      </template>
      <template #third>
        <ListWeeks title="Third" :weeks="diary.weeks" />
      </template>
    </AllWeeks>
  </section>
</template>

<style scoped>
.diary-details {
  background-color: var(--clr-light-brown);
  color: var(--clr-white);
}

.diary-details h2.section-title {
  color: var(--clr-white);
}

.diary-details-description {
  text-align: center;
  font-size: 18px;
  text-transform: lowercase;
  line-height: 2;
  letter-spacing: 1.1px;
  margin-bottom: 60px;
  padding-left: 50px;
  padding-right: 50px;
}

.diary-details-info {
  display: flex;
  justify-content: space-evenly;
  font-size: 28px;
  font-weight: 600;
  color: var(--clr-brown);
  margin-bottom: 200px;
}

.diary-details-info-positive-test-date,
.diary-details-info-due-date,
 .diary-details-info-gender {
  width: 400px;
  background-color: var(--clr-cream-bg);
  padding: 100px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
}

.diary-details-info-positive-test-date {
  border-radius: 70% 70% 70% 50% / 40% 60% 80% 80%;
}

.diary-details-info-due-date {
  border-radius: 30% 70% 20% 40% / 60% 40% 60% 40%;
}

.diary-details-info-gender {
  border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
}
</style>
