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
  template: `
    <div>comming soon...</div>
    `
})
export class CuTimeInputComponent {

  constructor() {}
}
