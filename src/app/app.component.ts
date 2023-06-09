import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './game.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  game$: Observable<State>;

  constructor(private store: Store<{ game: State }>) {
    this.game$ = this.store.select('game');
    this.game$.subscribe((state) => {
      this.resets = state.resets;
      this.zeros = state.zeros;
    });
  }
  resets = 0;
  title = 'Buttons';
  score = 0;
  highscore = 0;
  chance = 99;
  chanceReduction = 10;
  zeros = 0;

  addZeros(count: number) {
    this.zeros += count;
  }
}
