import {
  animate, Component, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, Renderer, SimpleChange, state, style, transition, trigger
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// import { Calendar } from './calendar';
import * as moment from 'moment';

interface DateFormatFunction {
  (date: Date): string;
}

interface ValidationResult {
  [key: string]: boolean;
}

@Component({
  selector: 'cu-time-input',
  // animations: [
  //   trigger('calendarAnimation', [
  //     transition('* => left', [
  //       animate(180, keyframes([
  //         style({ transform: 'translateX(105%)', offset: 0.5 }),
  //         style({ transform: 'translateX(-130%)', offset: 0.51 }),
  //         style({ transform: 'translateX(0)', offset: 1 })
  //       ]))
  //     ]),
  //     transition('* => right', [
  //       animate(180, keyframes([
  //         style({ transform: 'translateX(-105%)', offset: 0.5 }),
  //         style({ transform: 'translateX(130%)', offset: 0.51 }),
  //         style({ transform: 'translateX(0)', offset: 1 })
  //       ]))
  //     ])
  //   ])
  // ],
  // styles: [
  //   `.datepicker {
  //       position: relative;
  //       display: inline-block;
  //       color: #2b2b2b;
  //       font-family: "Proxima Nova", Arial, serif;
  //     }
  //
  //     .datepicker__calendar {
  //       position: absolute;
  //       overflow: hidden;
  //       z-index: 1000;
  //       height: 21.3em;
  //       width: 20.5em;
  //       font-size: 14px;
  //       background-color: #ffffff;
  //       box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
  //   	  border-radius: 5px;
  //       cursor: default;
  //       -webkit-touch-callout: none;
  //         -webkit-user-select: none;
  //            -moz-user-select: none;
  //             -ms-user-select: none;
  //                 user-select: none;
  //     }
  //
  //     .datepicker__calendar__cancel {
  //       position: absolute;
  //       bottom: 1em;
  //       left: 1.8em;
  //       color: #d8d8d8;
  //       cursor: pointer;
  //       -webkit-transition: 0.37s;
  //       transition: 0.37s;
  //     }
  //
  //     .datepicker__calendar__cancel:hover {
  //       color: #b1b1b1;
  //     }
  //
  //     .datepicker__calendar__content {
  //       margin-top: 0.4em;
  //     }
  //
  //     .datepicker__calendar__labels {
  //       display: -webkit-box;
  //       display: -ms-flexbox;
  //       display: flex;
  //       -webkit-box-pack: center;
  //          -ms-flex-pack: center;
  //        justify-content: center;
  //       width: 100%;
  //     }
  //
  //     .datepicker__calendar__label {
  //       display: inline-block;
  //       width: 2.2em;
  //       height: 2.2em;
  //       margin: 0 0.2em;
  //       line-height: 2.2em;
  //       text-align: center;
  //       color: #d8d8d8;
  //     }
  //
  //     .datepicker__calendar__month {
  //       display: -webkit-box;
  //       display: -ms-flexbox;
  //       display: flex;
  //       -ms-flex-flow: wrap;
  //           flex-flow: wrap;
  //       -webkit-box-pack: center;
  //          -ms-flex-pack: center;
  //        justify-content: center;
  //     }
  //
  //     .datepicker__calendar__month__day {
  //       display: inline-block;
  //       width: 2.2em;
  //       height: 2.2em;
  //       margin: 0 0.2em 0.4em;
  //       border-radius: 2.2em;
  //       line-height: 2.2em;
  //       text-align: center;
  //       -webkit-transition: 0.37s;
  //       transition: 0.37s;
  //     }
  //
  //     .datepicker__calendar__month__day:hover {
  //       background-color: rgba(168, 117, 254, 0.25) !important;
  //       color: #a875ff !important;
  //     }
  //
  //     .datepicker__calendar__nav {
  //       display: -webkit-box;
  //       display: -ms-flexbox;
  //       display: flex;
  //       -webkit-box-pack: center;
  //          -ms-flex-pack: center;
  //        justify-content: center;
  //       -webkit-box-align: center;
  //          -ms-flex-align: center;
  //             align-items: center;
  //       height: 3em;
  //       background-color: #fff;
  //       border-bottom: 1px solid #e8e8e8;
  //     }
  //
  //     .datepicker__calendar__nav__arrow {
  //       width: 0.8em;
  //       height: 0.8em;
  //       cursor: pointer;
  //       -webkit-transition: 0.37s;
  //       transition: 0.37s;
  //     }
  //
  //     .datepicker__calendar__nav__arrow:hover {
  //       -webkit-transform: scale(1.05);
  //               transform: scale(1.05);
  //     }
  //
  //     .datepicker__calendar__nav__chevron {
  //       fill: #bbbbbb;
  //       -webkit-transition: 0.37s;
  //       transition: 0.37s;
  //     }
  //
  //     .datepicker__calendar__nav__chevron:hover {
  //       fill: #2b2b2b;
  //     }
  //
  //     .datepicker__calendar__nav__header {
  //       width: 11em;
  //       margin: 0 1em;
  //       text-align: center;
  //     }
  //
  //     .datepicker__calendar__nav__header__form {
  //       display: inline-block;
  //       margin: 0;
  //     }
  //
  //     .datepicker__calendar__nav__header__year {
  //       display: inline-block;
  //       width: 3em;
  //       padding: 2px 4px;
  //       border: 1px solid #ffffff;
  //       border-radius: 2px;
  //       font-size: 1em;
  //       transition: 0.32s;
  //     }
  //
  //     .datepicker__calendar__nav__header__year:focus.ng-invalid {
  //       border: 1px solid #e82525;
  //     }
  //
  //     .datepicker__calendar__nav__header__year:focus.ng-valid {
  //       border: 1px solid #13ad13;
  //     }
  //
  //     .datepicker__calendar__nav__header__year:focus {
  //       outline: none;
  //     }
  //
  //     .datepicker__input {
  //       outline: none;
  //       border-radius: 0.1rem;
  //       padding: .2em .6em;
  //       font-size: 14px;
  //     }
  //   `
  // ],
  template: `
    <div>comming soon...</div>
    `
})
export class CuTimeInputComponent {

  constructor(private renderer: Renderer, private elementRef: ElementRef)
  {

  }
}
