// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressBar } from '@angular/material/progress-bar';
// import { finalize } from 'rxjs/operators';
// import { FormGroupDirective } from '@angular/forms';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatTooltipModule } from '@angular/material/tooltip';



// interface Product {
//   title: string;
//   images: string[];
//   currentIndex: number;
// }

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [RouterLink,
//     FormsModule,
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatProgressBar,
//     MatChipsModule,
//      MatTooltipModule

//   ],
//   templateUrl: './products.html',
//   styleUrl: './products.scss',
// })



// export class Products {

//   isFullscreenIndex: number | null = null;
//   API_URL = 'https://contact.back-serv-api.com/contact/send/';

//   limitMinutes = 5;
//   maxMessages = 3;
//   storageKey = 'contact_rate_limit';
//   currentImageIndex: number[] = [];

//   rateLimitError = '';

//   @ViewChild('contactForm') contactForm!: ElementRef<HTMLElement>;

//   currentYear = new Date().getFullYear();


//   form!: FormGroup;

//   isLoading = false;
//   products: Product[] = [
//     {
//       title: 'LE 355B: General überholt, getestet',
//       images: [
//         '/img/ts649.png',
//         '/img/LE355B.png'
//       ],
//       currentIndex: 0
//     },
//     {
//       title: 'Produkt B',
//       images: [
//         '/img/ts649.png',
//         '/img/LE355B.png'
//       ],
//       currentIndex: 0
//     },
//     {
//       title: 'Produkt C',
//       images: [
//         '/img/ts649.png',
//         '/img/LE355B.png'
//       ],
//       currentIndex: 0
//     }
//   ];

//   constructor(private fb: FormBuilder, private http: HttpClient) { }


//   ngOnInit() {
//     this.form = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       email: [
//         '',
//         [
//           Validators.required,
//           Validators.email,
//           Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
//         ]
//       ],
//       message: ['', [Validators.required, Validators.minLength(10)]],
//     });
//     this.currentImageIndex = this.products.map(() => 0);
//   }



//   get name() { return this.form.get('name'); }
//   get email() { return this.form.get('email'); }
//   get message() { return this.form.get('message'); }




//   toggleFullscreen(index: number) {
//     this.isFullscreenIndex =
//       this.isFullscreenIndex === index ? null : index;
//   }

//   next(product: Product) {
//     product.currentIndex =
//       (product.currentIndex + 1) % product.images.length;
//   }

//   prev(product: Product) {
//     product.currentIndex =
//       (product.currentIndex - 1 + product.images.length)
//       % product.images.length;
//   }


//   sendMessage(formDirective: FormGroupDirective) {
//     this.rateLimitError = '';

//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     if (!this.checkRateLimit()) {
//       this.rateLimitError =
//         `Du hast das Limit erreicht. Max. ${this.maxMessages} Nachrichten in ${this.limitMinutes} Minuten.`;
//       return;
//     }

//     this.isLoading = true;

//     this.http.post(this.API_URL, this.form.value)
//       .pipe(
//         finalize(() => {
//           this.isLoading = false;
//         })
//       )
//       .subscribe({
//         next: () => {
//           this.saveTimestamp();

//           // 🔥 DAS ist der entscheidende Teil
//           formDirective.resetForm(); // ← entfernt rote Rahmen komplett
//         },
//         error: (err) => {
//           console.error(err);
//         }
//       });
//   }



//   // --- RATE LIMIT FRONTEND ---
//   checkRateLimit(): boolean {
//     const raw = localStorage.getItem(this.storageKey);
//     if (!raw) return true;

//     const timestamps: number[] = JSON.parse(raw);
//     const now = Date.now();
//     const windowMs = this.limitMinutes * 60 * 1000;

//     // Nur Timestamps behalten, die noch im Zeitfenster liegen
//     const recent = timestamps.filter(t => now - t < windowMs);

//     return recent.length < this.maxMessages;
//   }

//   saveTimestamp() {
//     const raw = localStorage.getItem(this.storageKey);
//     let timestamps: number[] = raw ? JSON.parse(raw) : [];

//     timestamps.push(Date.now());

//     // Nur letzte N Einträge behalten (optional)
//     if (timestamps.length > 10) timestamps = timestamps.slice(-10);

//     localStorage.setItem(this.storageKey, JSON.stringify(timestamps));
//   }


//   scrollToForm(index: number) {
//     const title = this.products[index].title;

//     this.form.patchValue({
//       message: `Betreff: ${title}\n\n`
//     });
//     setTimeout(() => {
//       const textarea = document.querySelector(
//         'textarea[formControlName="message"]'
//       ) as HTMLTextAreaElement;

//       textarea?.focus();
//       textarea?.setSelectionRange(
//         textarea.value.length,
//         textarea.value.length
//       );
//     }, 300);
//     const yOffset = -100; // 100px vor dem Element
//     const element = this.contactForm.nativeElement;
//     const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//     window.scrollTo({ top: y, behavior: 'smooth' });
//   }


// }
/* ===========================
   Angular / Core
=========================== */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/* ===========================
   Forms
=========================== */
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';

/* ===========================
   HTTP / RXJS
=========================== */
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

/* ===========================
   Angular Material
=========================== */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

/* ===========================
   Interfaces
=========================== */
interface Product {
  title: string;
  images: string[];
  currentIndex: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,

    /* Material */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBar,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class Products {

  /* ===========================
     Constants / Config
  =========================== */
  readonly API_URL = 'https://contact.back-serv-api.com/contact/send/';
  readonly limitMinutes = 5;
  readonly maxMessages = 3;
  readonly storageKey = 'contact_rate_limit';

  /* ===========================
     State
  =========================== */
  isFullscreenIndex: number | null = null;
  isLoading = false;
  rateLimitError = '';
  currentYear = new Date().getFullYear();

  /* ===========================
     View / Form
  =========================== */
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLElement>;
  form!: FormGroup;

  /* ===========================
     Data
  =========================== */
  products: Product[] = [
    {
      title: 'LE 355B: General überholt, getestet',
      images: ['/img/ts649.png', '/img/LE355B.png'],
      currentIndex: 0
    },
    {
      title: 'Produkt B',
      images: ['/img/ts649.png', '/img/LE355B.png'],
      currentIndex: 0
    },
    {
      title: 'Produkt C',
      images: ['/img/ts649.png', '/img/LE355B.png'],
      currentIndex: 0
    }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  /* ===========================
     Lifecycle
  =========================== */
  ngOnInit(): void {
    this.initForm();
  }

  /* ===========================
     Form
  =========================== */
  private initForm(): void {
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
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }

  /* ===========================
     UI Actions
  =========================== */
  toggleFullscreen(index: number): void {
    this.isFullscreenIndex =
      this.isFullscreenIndex === index ? null : index;
  }

  next(product: Product): void {
    product.currentIndex =
      (product.currentIndex + 1) % product.images.length;
  }

  prev(product: Product): void {
    product.currentIndex =
      (product.currentIndex - 1 + product.images.length) %
      product.images.length;
  }

  scrollToForm(index: number): void {
    const title = this.products[index].title;

    this.form.patchValue({
      message: `Betreff: ${title}\n\n`
    });

    setTimeout(() => this.focusMessageField(), 300);
    this.scrollToFormElement();
  }


  /* ===========================
     Submit / HTTP
  =========================== */
  sendMessage(formDirective: FormGroupDirective): void {
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

    this.isLoading = true;

    this.http.post(this.API_URL, this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.saveTimestamp();
          formDirective.resetForm();
        },
        error: err => console.error(err)
      });
  }

  /* ===========================
     Helpers
  =========================== */
  private focusMessageField(): void {
    const textarea = document.querySelector(
      'textarea[formControlName="message"]'
    ) as HTMLTextAreaElement;

    if (!textarea) return;

    textarea.focus();
    textarea.setSelectionRange(
      textarea.value.length,
      textarea.value.length
    );
  }

  public scrollToFormElement(): void {
    const yOffset = -100;
    const element = this.contactForm.nativeElement;
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  /* ===========================
     Rate Limit (Frontend)
  =========================== */
  private checkRateLimit(): boolean {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return true;

    const timestamps: number[] = JSON.parse(raw);
    const now = Date.now();
    const windowMs = this.limitMinutes * 60 * 1000;

    const recent = timestamps.filter(t => now - t < windowMs);
    return recent.length < this.maxMessages;
  }

  private saveTimestamp(): void {
    const raw = localStorage.getItem(this.storageKey);
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    timestamps.push(Date.now());
    if (timestamps.length > 10) {
      timestamps = timestamps.slice(-10);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(timestamps));
  }
}
