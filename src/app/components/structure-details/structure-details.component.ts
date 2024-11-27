import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogModule 
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

// Define the interface for structure details
export interface StructureDetails {
  label: string;
  description?: string;
  obo_id: string;
  iri: string;
}

@Component({
  selector: 'app-structure-details',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div *ngIf="loading">Loading...</div>
    
    <div *ngIf="structureDetails" class="structure-details-container">
      <div class="dialog-header">
        <div class="header-content">
          <h2 mat-dialog-title class="structure-title">{{ structureDetails.label }}</h2>
          <div class="header-underline"></div>
        </div>
        <button 
          mat-icon-button 
          (click)="onClose()" 
          class="close-button"
          aria-label="Close">
          X
        </button>
      </div>
      
      <div mat-dialog-content class="dialog-content">
        <div class="detail-section">
          <strong>Description</strong>
          <p>{{ structureDetails.description || 'No description available' }}</p>
        </div>
        <div class="detail-section">
          <strong>Ontology Link</strong>
          <p>{{ structureDetails.obo_id }}</p>
        </div>
        <div class="detail-section">
          <strong>IRI</strong>
          <p>{{ structureDetails.iri }}</p>
        </div>
      </div>
    </div>
    
    <div *ngIf="error">
      <p>No details found for this structure.</p>
    </div>
  `,
  styles: [`
    .structure-details-container {
      width: 400px;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      padding: 16px;
      position: relative;
    }
    
    .header-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .structure-title {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.4;
    }
    
    .header-underline {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.12);
      margin-top: 8px;
    }
    
    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    
    .dialog-content {
      padding: 16px;
    }
    
    .detail-section {
      margin-bottom: 16px;
    }
    
    .detail-section strong {
      display: block;
      margin-bottom: 4px;
    }
    
    .detail-section p {
      margin: 0;
      word-break: break-word;
    }
  `]
})

export class StructureDetailsComponent implements OnInit {
  structureDetails: StructureDetails | null = null;
  loading = true;
  error = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { structureId: string },
    private dialogRef: MatDialogRef<StructureDetailsComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (this.data.structureId) {
      this.fetchStructureDetails(this.data.structureId);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  fetchStructureDetails(id: string) {
    // Update the API service to include this method
    const url = `https://www.ebi.ac.uk/ols4/api/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/${id.replace(':', '_')}`;

    this.apiService.fetchStructureDetails(url).subscribe({
      next: (details) => {
        this.structureDetails = details;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
