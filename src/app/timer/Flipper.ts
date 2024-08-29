export class Flipper {
    isFlipping = false;
    duration = 600;
    flipNode: HTMLElement;
    frontNode: HTMLElement;
    backNode: HTMLElement;
  
    constructor(flipNode: HTMLElement, currentTime: string, nextTime: string) {
      this.flipNode = flipNode;
      this.frontNode = flipNode.querySelector(".front");
      this.backNode = flipNode.querySelector(".back");
      this.setFrontTime(currentTime);
      this.setBackTime(nextTime);
    }
  
    setFrontTime(time: string): void {
      this.frontNode.setAttribute('data-number', time);
    }
  
    setBackTime(time: string): void {
      this.backNode.setAttribute('data-number', time);
    }
  
    flipDown(currentTime: string, nextTime: string): void {
      if (this.isFlipping) return;
  
      this.isFlipping = true;
      this.setFrontTime(currentTime);
      this.setBackTime(nextTime);
      this.flipNode.classList.add("running");
  
      setTimeout(() => {
        this.flipNode.classList.remove("running");
        this.isFlipping = false;
        this.setFrontTime(nextTime);
      }, this.duration);
    }
  }
  