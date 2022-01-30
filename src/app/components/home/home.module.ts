import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BlogResolver } from '../../services/blog.resolver';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  resolve: {
    blog: BlogResolver
  }
}];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
