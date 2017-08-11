import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CuTimeInputComponent } from './timeinput.component';

export * from './timeinput.component';

@NgModule({
  declarations: [ CuTimeInputComponent ],
  exports: [ CuTimeInputComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ]
})
export class DatepickerModule { }
