import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToA';
  grid = [];
  width = 100;
  height = 200;
  partyMembers = 4;
  food = 10;
  water = 200;
  ointment = 100;
  raincatchers = 4;

  rain = '';
  encounter = '';

  frank = true;

  constructor() {
    for (let x = 0; x < this.width; x++) {
      this.grid.push([]);
      for (let y = 0; y< this.height; y++) {
        this.grid[x].push(Math.random() >= 0.5);
      }
    }
    if(this.frank) { console.log("if is a function"); }
  }

  rollDX(x: number) {
    return Math.floor(Math.random() * x) + 1;
  }

  rollYDX(y: number, x: number) {
    let sum = 0;
    for (let i = 0; i < y; i++) {
      sum += this.rollDX(x);
    }
    return sum;
  }

  endDay() {
    console.log("End day");
    this.encounter = '';
    this.rain='';

    if (this.rollDX(20) >= 18) {
      console.log("Got Encounter");
      this.encounter = this.rollDX(100).toString();
    }

    if (this.rollDX(4) == 4) {
      console.log("Rain");
      this.rain = 'Heavy Rain'
    }

    
  }


}
