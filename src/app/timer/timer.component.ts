import {  Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit,OnDestroy {
  isFlipping: boolean[] = [false, false, false, false, false, false];
  targetDate: Date;
  timeRemaining: number[] =[];
  nextTimeRemaining: number[] =[];
  nowTimeStr :string;
  nextTimeStr :string;
  last : boolean = false;
  unitNames : string [] = ['years','months','days','hours','minutes','seconds']
  lastTimeRemaining = { ...this.timeRemaining };
  private subscription: Subscription;
  constructor() {
    this.targetDate = new Date('2028-10-22T00:00:00')
  }

  ngOnInit(): void {
    this.calculateTimeRemaining();
    this.subscription = interval(1000).subscribe(() => {
      this.lastTimeRemaining = { ...this.timeRemaining };
      this.updateCountdown();
      if (this.lastTimeRemaining.length -1){
        this.last = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCountdown(): void {
    this.calculateTimeRemaining();
    this.calculateNextTimeRemaining();
    this.timeRemaining.forEach((_, index) => {
      if (this.lastTimeRemaining[index] !== this.timeRemaining[index]) {
        this.triggerFlipAnimation(index);
        this.lastTimeRemaining[index] = this.timeRemaining[index];
      }
    });
  }
  private triggerFlipAnimation(index: number): void {
    this.isFlipping[index] = false;
    setTimeout(() => {
      this.isFlipping[index] = true;
    }, 660); 
  }
  private calculateTimeRemaining(): void {
    const now = new Date();
    const distance = this.targetDate.getTime() - now.getTime();

    if (distance <= 0) {
      this.timeRemaining = [0, 0, 0, 0, 0, 0];
      return;
    }

    this.timeRemaining = this.calculateTime(distance);
  }
 
  private calculateNextTimeRemaining(): void {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 1); // Advance by one second
    const distance = this.targetDate.getTime() - now.getTime();

    if (distance <= 0) {
      this.nextTimeRemaining = [0, 0, 0, 0, 0, 0];
      return;
    }

    this.nextTimeRemaining = this.calculateTime(distance);
  }

private calculateTime(distance: number): number[] {
    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return [years, months, days, hours, minutes, seconds];
  }
}
