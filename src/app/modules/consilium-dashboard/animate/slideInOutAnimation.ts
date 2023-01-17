import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('enter', style({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      transform: 'scale(0)',
    })),
    state('leave', style({
      transform: 'scale(1)',
    })),
    transition('enter => leave', animate('1000ms ease-in-out')),
    transition('leave => enter', animate('1000ms ease-in-out')),
  ]);
