import { Component } from '@angular/core';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = environment.main_page_title;
}
