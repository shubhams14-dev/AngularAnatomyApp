// structure-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ApiService, Structure } from '../../services/api.service';
import { StructureDetailsComponent } from '../structure-details/structure-details.component';

@Component({
  selector: 'app-structure-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatDialogModule
  ],
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss']
})
export class StructureListComponent implements OnInit {
  structures: Structure[] = [];
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchStructures();
  }

  fetchStructures() {
    this.loading = true;
    this.error = false;

    this.apiService.fetchAnatomicalStructures().subscribe({
      next: (structures) => {
        console.log('Fetched Structures:', structures);
        this.structures = structures;
        this.loading = false;
        
        if (structures.length === 0) {
          this.error = true;
          this.errorMessage = 'No structures found';
        }
      },
      error: (err) => {
        console.error('Error in component:', err);
        this.loading = false;
        this.error = true;
        this.errorMessage = err.message || 'Unknown error occurred';
      }
    });
  }

  openStructureDetails(structure: Structure) {
    if (structure.id) {
      this.dialog.open(StructureDetailsComponent, {
        data: { structureId: structure.id }
      });
    } else {
      alert('No details available for this structure');
    }
  }
}