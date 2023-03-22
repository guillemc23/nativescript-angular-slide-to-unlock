import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { View } from '@nativescript/core';

@Component({
  selector: 'SlideUnlock',
  templateUrl: './slide-to-unlock.component.html',
})
export class SlideToUnlockComponent implements OnInit {
  @ViewChild('infoText') infoTextRef: ElementRef;
  @ViewChild('slideButton') slideButtonRef: ElementRef;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Input() height: number = 70;
  @Input() radius: number = 70;
  @Input() containerBackgroundColor: string = 'lightgray';
  @Input() buttonText: string = '→';
  @Input() buttonTextSize: number = 20;
  @Input() buttonTextColor: string = 'black';
  @Input() buttonTextFontWeight: string = 'normal';
  @Input() buttonBackgroundColor: string = 'white';
  @Input() sliderLabel: string = 'Slide to unlock';
  @Input() infoTextSize: number = 16;
  @Input() infoTextColor: string = 'black';
  @Input() buttonHeight: number = 56;

  prevDeltaX: number = 0;
  slidePercent: number = 0;

  constructor() {}

  ngOnInit(): void {}

  reset(view: View) {
    view
      .animate({
        translate: { x: 0, y: 0 },
        duration: 100,
      })
      .then(() => {
        this.slidePercent = 0;
      });
  }

  slide(args) {
    const buttonView = args.view;
    const gridViewWidth =
      buttonView.parent.getActualSize().width -
      buttonView.parent.paddingLeft -
      buttonView.parent.paddingRight;
    if (args.state === 1) {
      // Start paning
      this.prevDeltaX = 0;
      this.slidePercent = 0;
    } else if (args.state === 2) {
      // Paning
      buttonView.translateX += args.deltaX - this.prevDeltaX;
      this.prevDeltaX = args.deltaX;
      if (buttonView.translateX < 0) {
        buttonView.translateX = 0;
        this.prevDeltaX = 0;
      } else {
        const buttonPosition = this.buttonHeight + buttonView.translateX;
        if (buttonPosition > gridViewWidth) {
          buttonView.translateX = gridViewWidth - this.buttonHeight;
          this.prevDeltaX = 0;
        }
      }
      this.slidePercent =
        (this.buttonHeight + buttonView.translateX) / gridViewWidth;
    } else if (args.state === 3) {
      // Done paning
      if (gridViewWidth !== this.buttonHeight + buttonView.translateX) {
        this.reset(buttonView);
      } else console.log('Yippieeeee!');
    }
  }
}
