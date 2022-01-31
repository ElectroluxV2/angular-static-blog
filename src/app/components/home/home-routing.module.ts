import { NgModule } from '@angular/core';
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
