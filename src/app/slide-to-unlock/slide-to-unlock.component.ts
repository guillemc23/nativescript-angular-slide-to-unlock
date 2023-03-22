import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

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
  @Input() infoText: string = 'Slide to unlock';
  @Input() infoTextSize: number = 16;
  @Input() infoTextColor: string = 'black';
  @Input() buttonHeight: number = 56;

  prevDeltaX: number = 0;
  slidePercent: number = 0;

  constructor() {}

  ngOnInit(): void {}

  slide(args) {
    console.log('Slided');
  }
}
