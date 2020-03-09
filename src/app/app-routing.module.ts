import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// Constant
import { appPath } from './app-path.const';



import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: appPath.home,
    //loadChildren: './home/home.module#HomeModule'
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: appPath.calendar,
    //loadChildren: './calendar-section/calendar-section.module#CalendarSectionModule'
    loadChildren: () => import('./calendar-section/calendar-section.module').then(mod => mod.CalendarSectionModule)
  },
  {
    path: appPath.login,
    // loadChildren: './login/login.module#LoginModule'
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
