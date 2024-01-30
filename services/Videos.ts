import APIBase from './HttpBase';
import type { Video, Videos } from '~/interface/videos.interface';

class VideoService extends APIBase {
  async getVideos(nextPageToken?: string): Promise<Videos> {
    let nextPage: string = nextPageToken?.length ? `?pageToken=${nextPageToken}` : '';
    return await this.get(`videos${nextPage}`);
  }

  async getVideoById(videoId: string): Promise<Video> {
    const response = await this.get<{ response: Video[] }>('videos/' + videoId);
    return response.response[0];
  }
}

export default VideoService;