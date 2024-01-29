<script setup lang="ts">
import { onMounted } from 'vue';

import useVideosStore from '../store/video';

const videosStore = useVideosStore();

const isFetching = ref(false);

function addScrollListener(): void {
  window.addEventListener('scroll', handleScroll);
}

function handleScroll(): void {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 100 && !isFetching.value) {
    isFetching.value = true;
    fetchMoreVideos();
  }
}

function fetchMoreVideos(): void {
  videosStore.getVideos(videosStore.videos.nextPageToken);
  isFetching.value = false;
}

onMounted(() => {
  if (!videosStore.videos.videos.length) {
    videosStore.getVideos();
  }
  addScrollListener();
})
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