export interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    categoryId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
    favoriteCount: string;
  };
}

export interface Feed {
  etag: string;
  items: YouTubeSearchResult[];
  kind: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}


export interface VideoSummary {
  code: number;
  message: string;
  data: {
    videoId: string;
    videoInfo: {
      name: string;
      thumbnailUrl: {
        hqdefault: string;
        maxresdefault: string;
      };
      embedUrl: string;
      duration: number;
      description: string;
      upload_date: string;
      genre: string;
      author: string;
    };
    language_code: {
      code: string;
      name: string;
    }[];
    transcripts: {
      [language: string]: {
        custom: TranscriptEntry[];
        default: TranscriptEntry[];
        auto: TranscriptEntry[];
      };
    };
  };
}

interface TranscriptEntry {
  start: string;
  end: string;
  text: string;
}
