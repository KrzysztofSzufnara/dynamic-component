import {
  Component,
  ComponentRef,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //vcr = inject(ViewContainerRef);
  vcr = viewChild('container', { read: ViewContainerRef });
  #componentRef?: ComponentRef<LogoComponent>;
  content = viewChild<TemplateRef<unknown>>('weatherContent');
  createComponent() {
    this.vcr()?.clear();
    const contentView = this.vcr()?.createEmbeddedView(this.content()!);
    this.#componentRef = this.vcr()?.createComponent(LogoComponent, {
      projectableNodes: [contentView?.rootNodes!],
    });
    this.#componentRef?.setInput('title', 'Test Title');
    this.#componentRef?.setInput('description', 'Test Description');
    this.#componentRef?.instance.closed.subscribe(() => {
      this.removeComponent();
    });
  }
  removeComponent() {
    this.vcr()?.clear();
  }
  title = 'dynamic-component';
}
