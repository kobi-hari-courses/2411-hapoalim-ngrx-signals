import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
