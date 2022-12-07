import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepinessViewPage } from './sleepiness-view.page';

const routes: Routes = [
  {
    path: '',
    component: SleepinessViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepinessViewPageRoutingModule {}
