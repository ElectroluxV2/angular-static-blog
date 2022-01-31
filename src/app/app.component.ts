import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @HostBinding('@.disabled')
  public animationsDisabled = true;

  constructor(public router: Router) {
    // Enable animations using micro task (after component render)
    setTimeout(() => this.animationsDisabled = false, 0);
  }
}
