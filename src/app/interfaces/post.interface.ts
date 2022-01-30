export interface Post {
  document: {
    title: string;
    description: string;
    category: string;
    slug: string;
    html?: string;
  };
  authors: {
    name: string;
    initials: string;
  }[];
  timestamps: string[];
}
