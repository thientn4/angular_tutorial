import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepinessViewPageRoutingModule } from './sleepiness-view-routing.module';

import { SleepinessViewPage } from './sleepiness-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepinessViewPageRoutingModule
  ],
  declarations: [SleepinessViewPage]
})
export class SleepinessViewPageModule {}
