
/* ===========================
   Angular / Core
=========================== */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    ReactiveFormsModule,


    /* Material */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBar,
    MatChipsModule,
    MatTooltipModule,
    
  ]
})
export class Products {

  readonly API_URL = 'https://contact.back-serv-api.com/contact/send/';
  readonly limitMinutes = 5;
  readonly maxMessages = 3;
  readonly storageKey = 'contact_rate_limit';

  
  isFullscreenIndex: number | null = null;
  fullscreenImage: string | null = null;
  isLoading = false;
  rateLimitError = '';

  // getBlockSize(product: Product): number {
  //   return product.images.length / 4;
  // }


  // getImage(product: Product, size: '400' | '720' | '1440' | 'original'): string {
  //   const block = this.getBlockSize(product);
  //   const index = product.currentIndex;

  //   const offset =
  //     size === '400' ? 0 :
  //     size === '720' ? block :
  //     size === '1440' ? block * 2 :
  //     block * 3;

  //   return product.images[offset + index];
  // }



  getImage(product: Product, size: '400' | '720' | '1440' | 'original'): string {
    const baseIndex = product.currentIndex;
    const blockSize = this.getBlockSize(product);
    const offset =
      size === '400' ? 0 :
      size === '720' ? blockSize :
      size === '1440' ? blockSize * 2 :
      blockSize * 3;
  
    return product.images[offset + baseIndex];
  }
  
  getBlockSize(product: Product): number {
    return product.images.length / 4;
  }
  






  @ViewChild('contactForm') contactForm!: ElementRef<HTMLElement>;
  form!: FormGroup;

  products: Product[] = [
    {
      title: 'Heidenhain ROD 850 36000 Drehgeber, überholt und getestet. Der Preis ist 1450,00€',
      images: [
        '/img/rod850/rod850-1-400.jpg', 
        '/img/rod850/rod850-2-400.jpg', 
        '/img/rod850/rod850-3-400.jpg', 
        '/img/rod850/rod850-4-400.jpg', 
        '/img/rod850/rod850-5-400.jpg', 

        '/img/rod850/rod850-1-720.jpg', 
        '/img/rod850/rod850-2-720.jpg', 
        '/img/rod850/rod850-3-720.jpg', 
        '/img/rod850/rod850-4-720.jpg', 
        '/img/rod850/rod850-5-720.jpg', 

        '/img/rod850/rod850-1-1440.jpg', 
        '/img/rod850/rod850-2-1440.jpg', 
        '/img/rod850/rod850-3-1440.jpg', 
        '/img/rod850/rod850-4-1440.jpg', 
        '/img/rod850/rod850-5-1440.jpg', 

        '/img/rod850/rod850-1-original.jpg', 
        '/img/rod850/rod850-2-original.jpg', 
        '/img/rod850/rod850-3-original.jpg', 
        '/img/rod850/rod850-4-original.jpg', 
        '/img/rod850/rod850-5-original.jpg', 
      ],
      currentIndex: 0
    },
    {
      title: 'Heidenhain LE 415B Steuerung, überholt und getestet. Der Preis ist 1450,00€',
      images: [
        '/img/le415b/le415b-1-400.jpg', 
         '/img/le415b/le415b-2-400.jpg',
         '/img/le415b/le415b-3-400.jpg',
         '/img/le415b/le415b-4-400.jpg',
         '/img/le415b/le415b-5-400.jpg',
         '/img/le415b/le415b-6-400.jpg',
         '/img/le415b/le415b-7-400.jpg',

         '/img/le415b/le415b-1-720.jpg', 
         '/img/le415b/le415b-2-720.jpg',
         '/img/le415b/le415b-3-720.jpg',
         '/img/le415b/le415b-4-720.jpg',
         '/img/le415b/le415b-5-720.jpg',
         '/img/le415b/le415b-6-720.jpg',
         '/img/le415b/le415b-7-720.jpg',

         '/img/le415b/le415b-1-1440.jpg', 
         '/img/le415b/le415b-2-1440.jpg',
         '/img/le415b/le415b-3-1440.jpg',
         '/img/le415b/le415b-4-1440.jpg',
         '/img/le415b/le415b-5-1440.jpg',
         '/img/le415b/le415b-6-1440.jpg',
         '/img/le415b/le415b-7-1440.jpg',

         '/img/le415b/le415b-1-original.jpg', 
         '/img/le415b/le415b-2-original.jpg',
         '/img/le415b/le415b-3-original.jpg',
         '/img/le415b/le415b-4-original.jpg',
         '/img/le415b/le415b-5-original.jpg',
         '/img/le415b/le415b-6-original.jpg',
         '/img/le415b/le415b-7-original.jpg',
      ],
      currentIndex: 0
    },
    {
      title: 'Heidenhain Stromversorgung UV 105 , überholt und getestet.',
      images: [
        '/img/uv105/uv105-1-400.jpg', 
        '/img/uv105/uv105-2-400.jpg',
        '/img/uv105/uv105-3-400.jpg',
        '/img/uv105/uv105-4-400.jpg',

        '/img/uv105/uv105-1-720.jpg', 
        '/img/uv105/uv105-2-720.jpg',
        '/img/uv105/uv105-3-720.jpg',
        '/img/uv105/uv105-4-720.jpg',

        '/img/uv105/uv105-1-1440.jpg', 
        '/img/uv105/uv105-2-1440.jpg',
        '/img/uv105/uv105-3-1440.jpg',
        '/img/uv105/uv105-4-1440.jpg',

        '/img/uv105/uv105-1-original.jpg', 
        '/img/uv105/uv105-2-original.jpg',
        '/img/uv105/uv105-3-original.jpg',
        '/img/uv105/uv105-4-original.jpg',
      ],
      currentIndex: 0
    },
    {
      title: 'Heidenhain LE 355B Bahnsteuerung, überholt und getestet.',
      images: [
        '/img/le355b/le355b-1-400.jpg',
        '/img/le355b/le355b-2-400.jpg',
        '/img/le355b/le355b-3-400.jpg',
        '/img/le355b/le355b-4-400.jpg',
        '/img/le355b/le355b-5-400.jpg',
        '/img/le355b/le355b-6-400.jpg',
        '/img/le355b/le355b-7-400.jpg',

        '/img/le355b/le355b-1-720.jpg',
        '/img/le355b/le355b-2-720.jpg',
        '/img/le355b/le355b-3-720.jpg',
        '/img/le355b/le355b-4-720.jpg',
        '/img/le355b/le355b-5-720.jpg',
        '/img/le355b/le355b-6-720.jpg',
        '/img/le355b/le355b-7-720.jpg',

        '/img/le355b/le355b-1-1440.jpg',
        '/img/le355b/le355b-2-1440.jpg',
        '/img/le355b/le355b-3-1440.jpg',
        '/img/le355b/le355b-4-1440.jpg',
        '/img/le355b/le355b-5-1440.jpg',
        '/img/le355b/le355b-6-1440.jpg',
        '/img/le355b/le355b-7-1440.jpg',
        
        '/img/le355b/le355b-1-original.jpg',
        '/img/le355b/le355b-2-original.jpg',
        '/img/le355b/le355b-3-original.jpg',
        '/img/le355b/le355b-4-original.jpg',
        '/img/le355b/le355b-5-original.jpg',
        '/img/le355b/le355b-6-original.jpg',
        '/img/le355b/le355b-7-original.jpg'
        
      ],
      currentIndex: 0
    },
    {
      title: 'Heidenhain Drehgeber ROD 700 3M Kabel, überholt und getestet.',
      images: [
        '/img/rod700/rod700-1-400.jpg',
        '/img/rod700/rod700-2-400.jpg',
        '/img/rod700/rod700-3-400.jpg',

        '/img/rod700/rod700-1-720.jpg',
        '/img/rod700/rod700-2-720.jpg',
        '/img/rod700/rod700-3-720.jpg',

        '/img/rod700/rod700-1-1440.jpg',
        '/img/rod700/rod700-2-1440.jpg',
        '/img/rod700/rod700-3-1440.jpg',

        '/img/rod700/rod700-1-original.jpg',
        '/img/rod700/rod700-2-original.jpg',
        '/img/rod700/rod700-3-original.jpg',
      ],
      currentIndex: 0
    },
    {
      title: 'Heidenhain LE 426PB Steuerung, überholt und getestet.(Fotos kommen noch!)',
      images: ['/img/le426pb/le426pb-1-400.jpg'],
      currentIndex: 0
    }
  ];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}



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
  // toggleFullscreen(index: number): void {
  //   this.isFullscreenIndex =
  //     this.isFullscreenIndex === index ? null : index;
  // }


  @HostListener('document:keydown.escape')
closeOnEscape() {
  if (this.isFullscreenIndex !== null) {
    this.toggleFullscreen(this.isFullscreenIndex);
  }
}


  toggleFullscreen(productIndex: number) {
    if (this.isFullscreenIndex === productIndex) {
      this.isFullscreenIndex = null;
      this.fullscreenImage = null;
      return;
    }

    const product = this.products[productIndex];
    const w = window.innerWidth;

    this.fullscreenImage =
      w >= 1600
        ? this.getImage(product, 'original')
        : w >= 1000
        ? this.getImage(product, '1440')
        : this.getImage(product, '720');

    this.isFullscreenIndex = productIndex;
  }





  next(product: Product): void {
    product.currentIndex =
      (product.currentIndex + 1) % product.images.length;
  }

  // prevRight(product: Product): void {
  //   product.currentIndex =
  //     (product.currentIndex + 1 + product.images.length) %
  //     product.images.length;
  // }

  // prevLeft(product: Product): void {
  //   product.currentIndex =
  //     (product.currentIndex - 1 + product.images.length) %
  //     product.images.length;
  // }


  prevLeft(product: Product) {
    const block = this.getBlockSize(product);
    product.currentIndex =
      (product.currentIndex - 1 + block) % block;
  }

  prevRight(product: Product) {
    const block = this.getBlockSize(product);
    product.currentIndex =
      (product.currentIndex + 1) % block;
  }



  prevFullscreen() {
    const product = this.products[this.isFullscreenIndex!];
    this.prevLeft(product);
    this.updateFullscreenImage();
  }
  
  nextFullscreen() {
    const product = this.products[this.isFullscreenIndex!];
    this.prevRight(product);
    this.updateFullscreenImage();
  }
  
  updateFullscreenImage() {
    const product = this.products[this.isFullscreenIndex!];
    const w = window.innerWidth;
  
    this.fullscreenImage =
      w >= 1600
        ? this.getImage(product, 'original')
        : w >= 1000
        ? this.getImage(product, '1440')
        : this.getImage(product, '720');
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
    const yOffset = -150;
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
