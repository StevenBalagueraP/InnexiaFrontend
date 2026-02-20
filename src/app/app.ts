import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SideMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('innexiafrontend');

  }
