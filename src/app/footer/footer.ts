import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    MatIconModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

    currentYear = new Date().getFullYear();


}
