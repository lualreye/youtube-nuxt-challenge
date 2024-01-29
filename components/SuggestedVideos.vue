<script setup lang="ts">
import useVideosStore from '~/store/video';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const videosStore = useVideosStore();

const { isFetching } = useInfiniteScroll();
</script>

<template>
  <div class="suggested-videos">
    <div
      v-if="videosStore.videos.videos.length"
      class="cards-wrapper">
      <SuggestedVideoCard
        v-for="(video, index) in videosStore.videos.videos"
        :key="index"
        :id="video.id"
        :channelTitle="video.channelTitle"
        :counterViews="video.viewCount"
        :title="video.title" 
        :thumbnail="video.thumbnail"
        :publishedAt="video.publishedAt"
        class="videos" />
    </div>
    <GlobalLoader v-if="videosStore.isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.suggested-videos {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 12px;
  @media (max-width: 1023px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 100%;
    max-width: 320px;
  }
  .cards-wrapper {
    gap: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .videos {
      width: 100%;
    }
  }
}
</style>
