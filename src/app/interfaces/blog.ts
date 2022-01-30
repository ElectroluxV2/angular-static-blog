import { Post } from './post.interface';

export class Blog extends Map<string, Post> {

  get posts(): Post[] {
    return Array.from(this.values());
  }

  public override get(slug: string): Post {
    return super.get(slug) ?? {} as Post;
  }

  public setPostHtml(slug: string, html: string): void {
    this.get(slug).document.html = html;
  }
}
