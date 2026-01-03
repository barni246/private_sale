import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Imprint } from './imprint/imprint';
import { Dataprotection } from './dataprotection/dataprotection';
import { Seo } from './seo/seo';



export const routes: Routes = [

  { path: '', component: Products },
   { path: 'seo', component: Seo },
  { path: 'imprint', component: Imprint },
  { path: 'dataprotection', component: Dataprotection },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
