import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Imprint } from './imprint/imprint';



export const routes: Routes = [

 { path: '', component: Products },
  { path: 'imprint', component: Imprint },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
