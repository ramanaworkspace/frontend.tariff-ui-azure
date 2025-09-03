import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'https://localhost:5001/api'; // adjust if using https

export interface TariffInput {
  countryOfOrigin: string;
  htsCode: string;
  quantity: number;
  productCostPerUnit: number;
  salePricePerUnit: number;
  pricingDate: string;
  absorptionRate: number; // 0..1
}

export interface TariffResult {
  productCost: number;
  dutyAmount: number;
  totalCostWithDuty: number;
  salePrice: number;
  dutyCostPassedToCustomer: number;
  totalRevenuePerUnit: number;
  marginAmount: number;
  marginPercent: number;
  quantity: number;
  totalProductCost: number;
  totalDutyAmount: number;
  baseRevenue: number;
  totalDutyPassedToCustomers: number;
  totalRevenueWithDuty: number;
  totalMarginAmount: number;
  tariffType: string;
  tariffRate: number;
  productDescription: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  calculate(input: TariffInput): Observable<TariffResult> {
    return this.http.post<TariffResult>(`${BASE}/tariff/calculate`, input);
  }
  report(input: TariffInput): Observable<Blob> {
    return this.http.post(`${BASE}/tariff/report`, input, { responseType: 'blob' });
  }
  uploadRules(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${BASE}/admin/rules/upload`, form);
  }
}