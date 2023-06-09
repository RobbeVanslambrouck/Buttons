import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { addReset, addZeros } from '../game.actions';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  constructor(private store: Store<{ resets: number }>) {}
  score = 0;
  @Input() highscore!: number;
  @Output() highscoreChange = new EventEmitter<number>();
  chance = 99;
  chanceReduction = 1;
  resets = 0;
  zeros = 1;

  btnBg =
    'background: linear-gradient(green ' +
    this.chance +
    '%, red ' +
    this.chance +
    '%);';

  buttonPress() {
    if (!this.#isSuccessful(this.chance)) {
      this.#reset();
      return;
    }
    this.chance -= this.chanceReduction;
    this.score++;

    this.#addZeros(this.score);
    if (this.highscore < this.score) {
      this.highscore = this.score;
      this.highscoreChange.emit(this.highscore);
    }
  }
  #addZeros(num: number): void {
    let str = '' + num;
    const zeros = (str.match(/0/g) || []).length;
    if (zeros !== 0) {
      this.zeros += zeros;
      this.store.dispatch(addZeros({ amount: zeros }));
    }
  }

  #isSuccessful(chance: number): boolean {
    return Math.random() < chance / 100;
  }

  #reset() {
    this.score = 0;
    this.chance = 99;
    this.store.dispatch(addReset());
    this.resets++;
    this.#addZeros(this.score);
  }
}
