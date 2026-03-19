export interface MusicResult {
  title: string;
  artist: string;
  url: string;
}

export interface QueryResponse {
  results: MusicResult[];
  message: string | null;
}

export interface QueryRequest {
  query: string;
}
