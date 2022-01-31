import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { TrailingSlashUrlSerializer } from './services/trailing-slash-url-serializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    TransferHttpCacheModule
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: TrailingSlashUrlSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
