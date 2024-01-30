import { defineStore } from 'pinia';

import type { Videos, Video } from '~/interface/videos.interface';
import VideoService from '~/services/Videos';

const videoService = new VideoService(import.meta.env.VITE_BASE_URL);

interface RootState {
  videos: Videos,
  selectedVideo: Video | null,
  isLoading: boolean,
  errorMessage: string | null
}

const useVideosStore = defineStore('VideosStore', {
  state: (): RootState => ({
    videos: {
      videos: [],
      nextPageToken: ''
    },
    selectedVideo: null,
    isLoading: false,
    errorMessage: null
  }),

  actions: {
    async getVideos(nextPageToken?: string): Promise<void> {
      this.isLoading = true;
      try {
        let response;
        if (nextPageToken?.length) {
          response = await videoService.getVideos(nextPageToken);
        } else {
          response = await videoService.getVideos(); 
        }

        if (response?.videos && response.videos) {
          this.videos.videos = [...this.videos.videos, ...response?.videos];
        }
        if (response.videos && this.videos) {
          this.videos.nextPageToken = response.nextPageToken;
        }
    } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.errorMessage = null;
        this.isLoading = false;
      }
    },

    async getVideoById(videoId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await videoService.getVideoById(videoId);
        this.selectedVideo = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.errorMessage = null;
        this.isLoading = false;
      }
    }
  }
});

export default useVideosStore;