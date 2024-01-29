import { onMounted, ref } from 'vue';
import useVideosStore from '../store/video';

export function useInfiniteScroll() {
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
  });

  return { isFetching };
};


