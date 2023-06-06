import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Buttons';
  score = 0;
  highscore = 0;
  chance = 99;
  chanceReduction = 10;
  resets = 0;
  zeros = 1;
  LowerChanceReductionLevel = 0;
  LowerChanceReductionCost = 1;

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
    }
  }

  buyLowerChanceReductionLevel() {
    if (this.zeros < this.LowerChanceReductionCost) return;
    this.zeros -= this.LowerChanceReductionCost;
    this.chanceReduction *= 0.9;
    this.LowerChanceReductionLevel++;
    this.LowerChanceReductionCost = Math.ceil(
      1.5 ** this.LowerChanceReductionLevel
    );
  }
}

function isSuccessful(chance: number): boolean {
  return Math.random() < chance / 100;
}

function countZeros(num: number): number {
  let str = '' + num;
  return (str.match(/0/g) || []).length;
}
