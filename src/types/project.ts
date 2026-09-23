export interface MediaSource {
  src: string;
  width: number;
}

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sources?: MediaSource[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year?: number;
  location?: string;
  status?: string;
  client?: string;
  projectType?: string;
  siteArea?: string;
  builtArea?: string;
  coverImage?: Media;
  images: Media[];
}
