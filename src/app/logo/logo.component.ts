import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  title = input('Test Logo Component');
  description = input('Test Description');
  closed = output<void>();
}
