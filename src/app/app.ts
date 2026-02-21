import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { SearchForm } from './shared/components/search-form/search-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SideMenuComponent, SearchForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('innexiafrontend');

  }
