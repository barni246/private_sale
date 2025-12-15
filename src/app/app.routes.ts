import { Routes } from '@angular/router';
import {  WelcomeComponent } from './welcome/welcome';
import { Products } from './products/products';



export const routes: Routes = [

 { path: '', component: WelcomeComponent },
 { path: 'products', component: Products },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
