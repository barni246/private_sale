
/* ===========================
   Angular / Core
=========================== */
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
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

import { PRODUCTS } from './products.data';
import { Meta, Title } from '@angular/platform-browser';

interface Product {
  title: string;
  images: string[];
  currentIndex: number;
  price:string
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
  products: Product[] = [];
  isFullscreenSquare = false;


  @ViewChild('contactForm') contactForm!: ElementRef<HTMLElement>;
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title, private metaService: Meta,
    private renderer: Renderer2
  ) { }



  ngOnInit(): void {
    this.initForm();
    this.products = PRODUCTS;
     this.titleService.setTitle('Heidenhain Geräte kaufen - TNC, LE 355, LE 355B, LE 415B, LE 415, UV 105 Stromversorgung Netzteil, ROD 700 & 850 | barnabas-gonda.de');

    this.metaService.updateTag({
      name: 'description',
      content: 'Heidenhain Geräte kaufen - TNC, LE 355, LE 355B, LE 415B, LE 415, UV 105 Stromversorgung Netzteil, ROD 700 & 850 | barnabas-gonda.de'
    });

     const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Barnabas Gonda Lagerauflösung",
      "url": "https://barnabas-gonda.de/heidenhain/",
      "logo": "https://barnabas-gonda.de/heidenhain/img/lager.png"
    }
    `;
    this.renderer.appendChild(document.head, script);

  }



  getImage(product: Product, size: '400' | '720' | '1440' | 'original'): string {
    const imagesCount = product.images.length;

    // Wenn nur ein Bild da ist, gib das zurück
    if (imagesCount === 1) {
      return product.images[0];
    }

    // Berechne Blockgröße (Anzahl Bilder pro Größe)
    const blockSize = this.getBlockSize(product);

    // Basisindex des aktuellen Bildes im Block
    const baseIndex = product.currentIndex;

    // Berechne Offset je nach Größe
    const offset =
      size === '400' ? 0 :
        size === '720' ? blockSize :
          size === '1440' ? blockSize * 2 :
            blockSize * 3;

    // Berechne finalen Index
    const imageIndex = offset + baseIndex;

    // Falls der Index außerhalb des Arrays liegt, gib das letzte Bild zurück (Fallback)
    if (imageIndex >= imagesCount) {
      return product.images[imagesCount - 1];
    }

    return product.images[imageIndex];
  }

  getBlockSize(product: Product): number {
    const imagesCount = product.images.length;

    // Wenn weniger als 4 Bilder, dann gibt es keine Blöcke – blockSize ist 1 (oder Anzahl der Bilder)
    if (imagesCount < 4) {
      return 1;
    }

    // Normalerweise teile Bilder in 4 Blöcke auf
    return imagesCount / 4;
  }


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
    this.isFullscreenSquare = false; // ⬅️ EXTREM WICHTIG
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
  this.logImageSize(this.fullscreenImage);
  // Test-Logik (Display!)
  this.isFullscreenSquare = window.innerWidth + 30 > window.innerHeight;
  //  console.log(' window.innerWidth',  window.innerWidth);
  // console.log('window.innerHeight', window.innerHeight);
  // console.log('this.isFullscreenSquare', this.isFullscreenSquare);

}

allokep:boolean =false;

private logImageSize(imageUrl: string): void {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    // console.log('Bild ORIGINAL:');
    // console.log('Breite:', img.naturalWidth);
    // console.log('Höhe:', img.naturalHeight);
    if( img.naturalHeight >img.naturalWidth ) {
      this.allokep = true;
    }
  };
}



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
    const price = this.products[index].price;
    this.form.patchValue({
      message: `Betreff: ${title}\nPreis:${price}\n`
    });

    setTimeout(() => this.focusMessageField(), 300);
    this.scrollToFormElement();
  }


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


//  ng build private_sale --configuration production --base-href /heidenhain/ 



