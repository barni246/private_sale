import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoDialog } from '../info-dialog/info-dialog';


export interface Product {
  title: string;
  description: string;
  image: string;
}


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})

export class WelcomeComponent {

  constructor(private dialog: MatDialog) {}

  products: Product[] = [
    {
      title: 'Heidenhain LE 355B',
      description: 'Getestete Steuerung, Netzteil ist überholt.',
      image: './img/LE355B.png'
    },
    {
      title: 'Heidenhain LE 355Q',
      description: 'Getestete Steuerung, Netzteil ist überholt.',
      image: './img/LE355Q.png'
    },
    {
      title: 'Heidenhain LE 415',
      description: 'Getestete Steuerung, Netzteil ist überholt.',
      image: './img/LE415.png'
    },
    {
      title: 'Heidenhain LE 426PB',
      description: 'Getestete Steuerung, Netzteil ist überholt.',
      image: './img/LE426.png'
    },
    {
      title: 'Heidenhain ROD 700',
      description: 'Getesteter Drehgeber, er ist überholt.',
      image: './img/ROD700.png'
    },
    {
      title: 'Heidenhain ROD 880',
      description: 'Getesteter Drehgeber, er ist überholt.',
      image: './img/ROD880.png'
    }
  ];

  openInfo(product: Product) {
    this.dialog.open(InfoDialog, {
      data: product,
      width: '450px',
      height: '100vh'
    });
  }
}