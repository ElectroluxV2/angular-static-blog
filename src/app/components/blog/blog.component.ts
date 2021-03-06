import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { fadeAnimation } from '../../fade.animation';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true,
  animations: [fadeAnimation],
  host: { '[@fadeAnimation]': '' }
})
export class BlogComponent {
  public post: Post = this.activatedRoute.snapshot.data['post'];

  constructor(private activatedRoute: ActivatedRoute) { }
}
