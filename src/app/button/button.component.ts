import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
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
    if (!isSuccessful(this.chance)) {
      this.score = 0;
      this.chance = 99;
      this.resets++;
      this.zeros++;
      return;
    }
    this.chance -= this.chanceReduction;
    this.score++;
    this.zeros += countZeros(this.score);
    if (this.highscore < this.score) {
      this.highscore = this.score;
      this.highscoreChange.emit(this.highscore);
    }
  }
}

function isSuccessful(chance: number): boolean {
  return Math.random() < chance / 100;
}

function countZeros(num: number): number {
  let str = '' + num;
  return (str.match(/0/g) || []).length;
}
