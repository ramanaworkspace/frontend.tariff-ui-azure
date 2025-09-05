import { Component,PLATFORM_ID,Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TariffResult } from './api.service';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [CommonModule],
  template: `
  <div style="max-width:900px;margin:16px auto;padding:16px;border:1px solid #eee;border-radius:8px">
    <h2>Results</h2>
    <ng-container *ngIf="result; else empty">
      <h3>Per Unit</h3>
      <ul>
        <li>Product Cost: {{result.productCost | currency}}</li>
        <li>Duty Amount: {{result.dutyAmount | currency}}</li>
        <li>Total Cost with Duty: {{result.productCost + result.dutyAmount | currency}}</li>
        <li>Sale Price: {{result.salePrice | currency}}</li>
        <li>Duty Passed to Customer: {{result.dutyCostPassedToCustomer | currency}}</li>
        <li>Total Revenue per Unit: {{result.totalRevenuePerUnit | currency}}</li>
        <li>Margin ($): {{result.marginAmount | currency}}</li>
        <li>Margin (%): {{result.marginPercent}}%</li>
      </ul>

      <h3>Totals (Qty: {{result.quantity}})</h3>
      <ul>
        <li>Total Product Cost: {{result.totalProductCost | currency}}</li>
        <li>Total Duty Amount: {{result.totalDutyAmount | currency}}</li>
        <li>Total Cost with Duty: {{result.totalCostWithDuty | currency}}</li>
        <li>Base Revenue: {{result.baseRevenue | currency}}</li>
        <li>Total Duty Passed: {{result.totalDutyPassedToCustomers | currency}}</li>
        <li>Total Revenue with Duty: {{result.totalRevenueWithDuty | currency}}</li>
        <li>Total Margin: {{result.totalMarginAmount | currency}}</li>
      </ul>

      <h3>Tariff</h3>
      <ul>
        <li>Type: {{result.tariffType}}</li>
        <li>Rate: {{result.tariffRate}}%</li>
      </ul>
    </ng-container>
    <ng-template #empty>
      <p>No result found; please run a calculation first.</p>
    </ng-template>
  </div>
  `
})
export class ResultsComponent {
  result: TariffResult | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
     const json = sessionStorage.getItem('result');
    if(json) this.result = JSON.parse(json);
  }
  }
}