import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RouterLink],
    template: `
    <nav style="padding: 12px; border-bottom: 1px solid #ddd">
      <a routerLink="/" style="margin-right:12px">Calculator</a>
      <a routerLink="/admin/rules">Admin: Rules</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
