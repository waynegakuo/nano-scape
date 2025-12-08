import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'wip',
    loadComponent: () => import('./pages/work-in-progress/work-in-progress').then(m => m.WorkInProgress)
  },
];
