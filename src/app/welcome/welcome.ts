import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoDialog } from '../info-dialog/info-dialog';

import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';





export interface Product {
  title: string;
  description: string;
  image: string;
}


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})

export class WelcomeComponent {





  API_URL = 'https://contact.back-serv-api.com/contact/send/';

  // Frontend-Rate-Limits
  limitMinutes = 5;                      // Zeitfenster
  maxMessages = 3;                       // Max. Anzahl innerhalb des Zeitfensters
  storageKey = 'contact_rate_limit';

  rateLimitError = '';

  form!: FormGroup; // wird in ngOnInit erstellt


  constructor(private dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) { }



  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
        ]
      ],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }



  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }



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


  sendMessage() {
    this.rateLimitError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.checkRateLimit()) {
      this.rateLimitError =
        `Du hast das Limit erreicht. Max. ${this.maxMessages} Nachrichten in ${this.limitMinutes} Minuten.`;
      return;
    }

    this.http.post(this.API_URL, this.form.value).subscribe({
      next: () => {
        this.saveTimestamp();
      //  alert('Nachricht erfolgreich gesendet!');
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
       // alert('Es ist ein Fehler aufgetreten.');
      }
    });
  }

  // --- RATE LIMIT FRONTEND ---
  checkRateLimit(): boolean {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return true;

    const timestamps: number[] = JSON.parse(raw);
    const now = Date.now();
    const windowMs = this.limitMinutes * 60 * 1000;

    // Nur Timestamps behalten, die noch im Zeitfenster liegen
    const recent = timestamps.filter(t => now - t < windowMs);

    return recent.length < this.maxMessages;
  }

  saveTimestamp() {
    const raw = localStorage.getItem(this.storageKey);
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    timestamps.push(Date.now());

    // Nur letzte N Einträge behalten (optional)
    if (timestamps.length > 10) timestamps = timestamps.slice(-10);

    localStorage.setItem(this.storageKey, JSON.stringify(timestamps));
  }



}