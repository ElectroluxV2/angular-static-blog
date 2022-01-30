import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public blog: Blog = this.activatedRoute.snapshot.data['blog'];

  constructor(private activatedRoute: ActivatedRoute) { }
}
