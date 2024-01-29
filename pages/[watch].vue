<script setup lang="ts">
import { useRoute } from 'vue-router';

import useVideosStore from '../store/video';

const route = useRoute();

const videosStore = useVideosStore();

onMounted(() => {
  videosStore.getVideoById(route.params.watch as string);
});
</script>


<template>
  <div
    v-if="videosStore.selectedVideo"
    class="video-detail">
    <div class="video-detail-wrapper">
      <iframe
        :src="videosStore.selectedVideo.videoURL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video">
      </iframe>
      <div class="video-detail-wrapper-content">
        <h3>
          {{ videosStore.selectedVideo.title }}
        </h3>
        <div class="channel-details">
          <img
            :src="videosStore.selectedVideo.thumbnail"
            :alt="videosStore.selectedVideo.channelTitle">
          <div class="channel-details-content">
            <p class="title">
              {{ videosStore.selectedVideo.channelTitle }}
            </p>
            <p>
              {{ videosStore.selectedVideo.likeCount }} Likes
            </p>
            <p>
              {{ videosStore.selectedVideo.publishedAt }}
            </p>
            <p>
              {{ videosStore.selectedVideo.viewCount }} visualizaciones
            </p>
          </div>
        </div>
        <div class="video-description">
          <p>
            {{ videosStore.selectedVideo.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="video-detail-suggestions">
      <SuggestedVideos />
    </div>
  </div>
  <GlobalLoader v-else />
</template>

<style lang="scss" scoped>
.video-detail {
  width: 100%;
  display: flex;
  padding: 24px 0;
  justify-content: space-around;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  &-wrapper {
    padding: 0 24px;
    flex-grow: 1;
    max-width: 920px;
    @media (min-width: 721px) {
      height: 560px;
    }

    @media (min-width: 481px) and (max-width: 720px) {
      height: 520px;
    }

    @media (min-width: 320px) and (max-width: 480px) {
      height: 320px;
    }
    .video {
      width: 100%;
      height: 100%;
      max-width: 920px;
      margin: 0 auto;
      border-radius: 8px;
      box-shadow: inset 0px 0px 36px 36px rgba(0,0,0,0.75);
    }
    &-content {
      display: flex;
      flex-direction: column;
      .channel-details {
        display: flex;
        margin: 16px 0;
        img {
          margin: 12px 12px 0 0;
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
        &-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          .title {
            font-size: $body-font-size;
            color: $white;
          }
          p {
            color: $gray;
          }
        }
      }
      .video-description {
        p {
          line-height: 24px;
        }
      }
    }
  }
}
</style>