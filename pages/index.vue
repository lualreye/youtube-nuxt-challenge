<script setup lang="ts">
import useVideosStore from '~/store/video';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const videosStore = useVideosStore();

const { isFetching } = useInfiniteScroll();
</script>

<template>
  <div
    v-if="videosStore.videos.videos.length"
    class="cards-wrapper">
    <VideoCard
      v-for="(video, index) in videosStore.videos.videos"
      :key="index"
      :id="video.id"
      :channelTitle="video.channelTitle"
      :counterViews="video.viewCount"
      :title="video.title" 
      :thumbnail="video.thumbnail"
      :publishedAt="video.publishedAt" />
  </div>
  <GlobalLoader v-if="videosStore.isLoading" />
</template>

<style lang="scss" scoped>
.cards-wrapper {
  width: 100%;
  display: grid;
  grid-gap: 16px;
  padding: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>