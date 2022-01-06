import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Blog } from "../interfaces/blog.interface";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private cache: Map<string, string | Blog> = new Map<string, string | Blog>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: string) {
    this.prefetchAllData()
      .then(() => isPlatformBrowser(platformId) && localStorage.setItem('cache', JSON.stringify([...this.cache])))
      .catch(() => isPlatformBrowser(platformId) && (this.cache = new Map<string, string | Blog>(JSON.parse(localStorage.getItem('cache') ?? ""))));
  }

  private async prefetchAllData() {
    const blog = await firstValueFrom(this.http.get<Blog>("http://localhost:4200/assets/blog/blog.json")) as Blog;
    blog.posts = blog.posts.sort((a, b) => a.datetime.localeCompare(b.datetime));
    this.cache.set('blog', blog);

    for (const post of blog.posts) {
      this.cache.set(post.filename, await firstValueFrom(this.http.get(`http://localhost:4200/assets/blog/${post.filename}`, {
        'responseType': 'text'
      })) as string);
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async getCachedItem<Type>(key: string): Promise<Type> {
    while (!this.cache.has(key)) {
      await this.sleep(10);
    }

    return this.cache.get(key) as unknown as Type;
  }

  public async getBlog(): Promise<Blog> {
    return await this.getCachedItem('blog');
  }

  public async getPost(filename: string): Promise<string> {
    return await this.getCachedItem(filename);
  }
}
