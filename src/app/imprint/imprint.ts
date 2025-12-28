import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-imprint',
  imports: [
    MatIconModule,
    RouterLink,
    MatTooltipModule
],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {
constructor() { }

  openGoogleMaps() {
    const address = 'Barnabas Gonda, Mühlackerweg 9, 83246 Unterwössen, Germany';
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsLink, '_blank');
  }
}
