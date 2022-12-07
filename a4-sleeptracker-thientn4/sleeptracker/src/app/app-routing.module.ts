import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sleep-view',
    loadChildren: () => import('./sleep-view/sleep-view.module').then( m => m.SleepViewPageModule)
  },
  {
    path: 'sleep-log',
    loadChildren: () => import('./sleep-log/sleep-log.module').then( m => m.SleepLogPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'sleepiness-view',
    loadChildren: () => import('./sleepiness-view/sleepiness-view.module').then( m => m.SleepinessViewPageModule)
  },
  {
    path: 'sleepiness-log',
    loadChildren: () => import('./sleepiness-log/sleepiness-log.module').then( m => m.SleepinessLogPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
