import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'libraries';
  date = new Date();
  data = [
    { date: new Date().setDate(this.date.getDate() - 4), value: 1 },
    { date: new Date().setDate(this.date.getDate() - 3), value: 3 },
    { date: new Date().setDate(this.date.getDate() - 2), value: 2 },
    { date: new Date().setDate(this.date.getDate() - 1), value: 5 },
    { date: new Date().setDate(this.date.getDate() - 0), value: 2 }
  ];
}
