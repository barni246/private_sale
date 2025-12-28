import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

 activeIndex = 0;

constructor(
   
    private cdr: ChangeDetectorRef
  ) {}


  
  date = '';
    time = '';
    private sub!: Subscription;
  
  
    ngOnInit(): void {
      this.updateDateTime();
  
      this.sub = interval(1000).subscribe(() => {
        this.updateDateTime();
        this.cdr.markForCheck();  // <- wichtig, um View zu aktualisieren
      });
       this.sub = interval(1000).subscribe(() => {
        this.activeIndex = (this.activeIndex + 1) % 3;
      });
    }
  
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
  
    private updateDateTime(): void {
      const now = new Date();
      this.date = now.toLocaleDateString('de-DE');
      this.time = now.toLocaleTimeString('de-DE', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

}
