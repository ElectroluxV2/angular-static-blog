import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import { BlogService } from './blog.service';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Promise<Post>> {
  constructor(private blogService: BlogService, private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Post> {
    try {
      return await this.blogService.getPost(route.paramMap.get('slug') ?? '');
    } catch (e) {
      await this.router.navigateByUrl('/404', {
        skipLocationChange: true
      });
      throw e;
    }
  }
}
