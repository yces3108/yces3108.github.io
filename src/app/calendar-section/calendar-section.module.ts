import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarSectionRoutingModule } from './calendar-section-routing.module';
import { CalendarSectionComponent } from './calendar-section.component';
import { CalendarDateComponent } from '../calendar-date/calendar-date.component';


@NgModule({
  declarations: [
    CalendarSectionComponent, 
    CalendarDateComponent
  ],
  imports: [
    CommonModule,
    CalendarSectionRoutingModule
  ]
})
export class CalendarSectionModule { }
