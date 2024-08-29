import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from "./timer/timer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'countdown';
}
