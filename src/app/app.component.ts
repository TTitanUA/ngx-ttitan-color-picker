import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test playground';

  colorPickers = [];


  constructor() {
    this.generateColorPickers();
  }

  generateColorPickers() {
    this.colorPickers = [];
    for(let i = 0; i < 100; i++) {
      this.colorPickers.push({
        color: this.randHexColor(!(i % 2)),
        alpha: !(i % 2),
        input: (!(i % 2)) ? 'hex8' : 'hex6',
        output: (!(i % 2)) ? 'hex8' : 'hex6',
        debug: true
      });
    }
  }

  randHexColor(alpha: boolean = false) {
    let hex = '#' + (((Math.random() * 255) | (Math.random() * 255) << 8 | (Math.random() * 255) << 16) | 1 << 24).toString(16).slice(1);

    return alpha ? hex + 'ff' : hex;

  }

  colorChange(color, id) {
    console.group("colorChange picker: " + id);
    console.log(color);
    console.groupEnd();
  }
}

