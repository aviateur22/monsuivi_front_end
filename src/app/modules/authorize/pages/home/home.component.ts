import { Component } from '@angular/core';
import { version } from '../../../../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  version: string = version;
}
