import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-dialog',
  standalone:true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './info-dialog.html',
  styleUrl: './info-dialog.scss',
})
export class InfoDialog {

   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
