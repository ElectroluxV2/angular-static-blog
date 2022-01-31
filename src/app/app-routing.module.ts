import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'blog',
  loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
}, {
  path: '',
  loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
}, {
  path: '**',
  redirectTo: '404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

