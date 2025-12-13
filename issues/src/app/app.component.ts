import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #ffffffff;
      }
  `]
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('issues');
}
