export interface Video {
  id: string,
  title: string,
  thumbnail: string,
  publishedAt: string,
  channelTitle: string,
  description: string,
  videoURL?: string,
  viewCount: string,
  likeCount?: string 
}

export interface Videos {
  videos: Video[],
  nextPageToken: string
}