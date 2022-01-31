import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { Post } from '../interfaces/post.interface';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  #blog?: Blog;
  readonly #b;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: string) {
    this.#b = isPlatformServer(this.platformId) ? 'http://localhost:8080' : '';
  }

  public async getBlog(): Promise<Blog> {
    if (!!this.#blog) return this.#blog;

    const metadata = await firstValueFrom(this.http.get<{posts: Post[]}>(`${this.#b}/assets/blog/blog.json`));
    this.#blog = new Blog(metadata.posts.map(post => [post.document.slug, post]));

    return this.#blog;
  }

  public async getPost(slug: string): Promise<Post> {
    if (!this.#blog) await this.getBlog();
    if (!this.#blog?.has(slug)) throw Error(`Post '${slug}' does not exists!`);

    const post = this.#blog.get(slug);
    if (!post.document.html) {
      post.document.html = await firstValueFrom(this.http.get(`${this.#b}/assets/blog/${slug}.html`, {responseType: 'text'}));
    }

    return post;
  }
}
