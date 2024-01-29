<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  channelTitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  counterViews: {
    type: String,
    required: true
  },
  publishedAt: {
    type: String,
    required: true
  }
});

const publishedAtCopy = computed(() => props.publishedAt + ' visualizaciones');
</script>

<template>
  <NuxtLink
    :to="`/${id}`"
    class="youtube-card">
    <img
      :src="thumbnail"
      :alt="channelTitle"
      class="youtube-card-thumbnail">
    <div class="youtube-card-info">
      <div class="youtube-card-info-content">
        <h3 class="title">
          {{ title }}
        </h3>
        <p class="published-date">
          {{  channelTitle }}
        </p>
        <p class="published-date">
          {{  publishedAtCopy }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.youtube-card {
  display: flex;
  border-radius: 8px;
  gap: 8px;
  width: 100%;
  justify-content: center;
  max-width: 420px;
  margin: 0 auto;
  
  &-thumbnail {
    border-radius: 8px;
    width: 180px;
    height: 120px;
  }

  &-info {
    display: flex;
    align-items: flex-start;

    &-content {
      font-size: 1rem;
      color: $white;
      text-decoration: none;
      .title {
        color: $white;
        font-size: $body-font-size;
        margin: 12px 0 4px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Número de líneas que quieres mostrar */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .published-date {
        font-size: 0.8rem;
        color: $gray-light;
      }
    }
  
  
  }

}
</style>