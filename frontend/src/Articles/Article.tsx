export interface Article {
  title: string;
  body: string;
  author: string;
}

export interface ExistingArticle extends Article {
  id: number;
  publishDate: Date;
}
