import { Component } from '@angular/core';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  title = 'ToA';
  map: any = { position: {}};
  hexHeight = 13 / 2;
  hexWidth = 11.15;
  mapZoom = 2;
  baseHex = {
    top: 102,
    left: 96
  };
  rain = 'Light';
  mapObservable: any;

  constructor(private db: AngularFireDatabase) {
    db.object('map').valueChanges()
      .subscribe((map: any) => {
        this.map = map;
      });
  }

}
