import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepViewPageRoutingModule } from './sleep-view-routing.module';

import { SleepViewPage } from './sleep-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepViewPageRoutingModule
  ],
  declarations: [SleepViewPage]
})
export class SleepViewPageModule {}
