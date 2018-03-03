import { trigger, state, transition, group, query, style, animate, keyframes } from '@angular/animations';

export let routeAnimation = trigger('routeAnimation', [

  // animation for component with depth x to component with depth > x
  transition(
    '0 => 1, ' +
    '0 => 2, ' +
    '0 => 3, ' +
    '0 => 4, ' +
    '0 => 5, ' +
    '0 => 6, ' +

    '1 => 2, ' +
    '1 => 3, ' +
    '1 => 4, ' +
    '1 => 5, ' +
    '1 => 6, ' +

    '2 => 3, ' +
    '2 => 4, ' +
    '2 => 5, ' +
    '2 => 6, ' +

    '3 => 4, ' +
    '3 => 5, ' +
    '3 => 6, ' +

    '4 => 5, ' +
    '4 => 6, ' +

    '5 => 6', [

    // set initial height at the beginning of the animation to what it would be at the end of the animation
    style({ height: '!' }),

    // set up initial position of the component that is entering the scene
    query(':enter', style({ transform: 'translateX(100%)' })),

    // position absolute to have complete control over the positioning on the page
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),

    // do at once
    group([

      // take the component that is leaving the scene & slowly animate over .3 seconds
      query(':leave', [animate('0.4s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(-100%)'}))]),

      // take the component that is entering the scene & slowly animate over .3 seconds
      query(':enter', [animate('0.4s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)'}))])
    ])
  ]),

  // and again for the transition back
  transition(
    '1 => 0, ' +

    '2 => 0, ' +
    '2 => 1, ' +

    '3 => 0, ' +
    '3 => 1, ' +
    '3 => 2, ' +

    '4 => 0, ' +
    '4 => 1, ' +
    '4 => 2, ' +
    '4 => 3, ' +

    '5 => 0, ' +
    '5 => 1, ' +
    '5 => 2, ' +
    '5 => 3, ' +
    '5 => 4, ' +

    '6 => 0, ' +
    '6 => 1, ' +
    '6 => 2, ' +
    '6 => 3, ' +
    '6 => 4, ' +
    '6 => 5', [
    style({ height: '!' }),
    query(':enter', style({ transform: 'translateX(-100%)' })),
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
    group([
      query(':leave', [animate('0.4s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(100%)'}))], {optional: true}),
      query(':enter', [animate('0.4s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)'}))])
    ])
  ])
]);

// export let collapseAnimation = trigger('collapseAnimation', [
//   state('open', style({
//     opacity: '1',
//     display: 'block',
//     transform: 'translate3d(0, 0, 0)'
//   })),
//   state('closed',   style({
//     opacity: '0',
//     display: 'none',
//     transform: 'translate3d(0, -100%, 0)'
//   })),
//   transition('closed => open', animate('200ms ease-in')),
//   transition('open => closed', animate('100ms ease-out'))
// ]);
