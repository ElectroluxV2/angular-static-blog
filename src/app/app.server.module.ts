import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UrlSerializer } from '@angular/router';
import { TrailingSlashUrlSerializer } from './services/trailing-slash-url-serializer';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: UrlSerializer,
    useClass: TrailingSlashUrlSerializer
  }]
})
export class AppServerModule {}
