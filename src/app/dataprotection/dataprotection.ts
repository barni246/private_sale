import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dataprotection',
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './dataprotection.html',
  styleUrl: './dataprotection.scss',
})
export class Dataprotection {

}
