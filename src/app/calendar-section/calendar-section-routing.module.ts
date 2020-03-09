import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { CalendarSectionComponent } from './calendar-section.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarSectionComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarSectionRoutingModule { }
