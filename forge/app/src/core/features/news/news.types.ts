export interface NewsInfo {
  id: number;
  attributes: News;
}

export interface News {
  title: string;
  description: string;
  text: string;
  date: string;
  image?: any;
}
