import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, TariffInput } from './api.service';

@Component({
  standalone: true,
  selector: 'app-tariff-form',
  imports: [CommonModule, FormsModule],
  template: `
  <div style="max-width:900px;margin:16px auto;padding:16px;border:1px solid #eee;border-radius:8px">
    <h2>Tariff Calculator</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="row">
        <label>Country of Origin</label>
        <input [(ngModel)]="model.countryOfOrigin" name="country" required />
      </div>
      <div class="row">
        <label>HTS Code</label>
        <input [(ngModel)]="model.htsCode" name="hts" required />
      </div>
      <div class="row">
        <label>Quantity</label>
        <input type="number" [(ngModel)]="model.quantity" name="qty" required min="1" />
      </div>
      <div class="row">
        <label>Product Cost / Unit</label>
        <input type="number" step="0.01" [(ngModel)]="model.productCostPerUnit" name="cost" required />
      </div>
      <div class="row">
        <label>Sale Price / Unit</label>
        <input type="number" step="0.01" [(ngModel)]="model.salePricePerUnit" name="price" required />
      </div>
      <div class="row">
        <label>Pricing Date</label>
        <input type="date" [(ngModel)]="model.pricingDate" name="date" required />
      </div>
      <div class="row">
        <label>Absorption Rate (0..1)</label>
        <input type="number" step="0.01" [(ngModel)]="model.absorptionRate" name="absRate" required min="0" max="1" />
      </div>

      <button type="submit">Calculate</button>
      <button type="button" (click)="downloadPdf()">Download PDF</button>
    </form>
  </div>
  `,
  styles: [`
    .row{ display:flex; gap:12px; margin:8px 0; align-items:center }
    .row>label{ width:220px }
    input{ flex:1; padding:6px 8px }
    button{ margin-right:12px }
  `]
})
export class TariffFormComponent {
  model: TariffInput = {
    countryOfOrigin: 'India',
    htsCode: '0101.21.00',
    quantity: 1,
    productCostPerUnit: 100,
    salePricePerUnit: 98,
    pricingDate: new Date().toISOString().substring(0,10),
    absorptionRate: 0.5
  };

  constructor(private api: ApiService, private router: Router){}

  onSubmit(){
    this.api.calculate(this.model).subscribe(res => {
      sessionStorage.setItem('result', JSON.stringify(res));
      this.router.navigate(['/results']);
    });
  }

  downloadPdf(){
    this.api.report(this.model).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TariffReport.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}