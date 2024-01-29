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
      <img
        :src="thumbnail"
        :alt="title"
        class="youtube-card-info-channel-image">
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
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  height: 342px;
  
  &-thumbnail {
    border-radius: 8px;
    height: 220px;
    width: 100%;
  }

  &-info {
    display: flex;
    align-items: flex-start;
    &-channel-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: none;
      margin: 12px 12px 0 0;
    }

    &-content {
      font-size: 1rem;
      color: $white;
      text-decoration: none;
      margin: 0 0 10px 0;
      padding-right: 24px;
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