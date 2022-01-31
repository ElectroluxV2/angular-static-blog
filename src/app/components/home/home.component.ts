import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { fadeAnimation } from '../../fade.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  host: { '[@fadeAnimation]': '' }
})
export class HomeComponent {
  public blog: Blog = this.activatedRoute.snapshot.data['blog'];

  constructor(private activatedRoute: ActivatedRoute) { }
}
