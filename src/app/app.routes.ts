import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SuggestionDetail } from './pages/suggestion-detail/suggestion-detail';


export const routes: Routes = [
    {
    path: '',
    component: Home
  },
  {
    path: 'suggestions/:id',
    component: SuggestionDetail
  }
];
