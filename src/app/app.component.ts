import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public appName = 'Les receptes de la iaia';
  protected readonly title = signal('ioc-angular-receptes-iaia-elena-vyrostkova');
}
