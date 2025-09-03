import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  standalone: true,
  selector: 'app-rules-upload',
  imports: [CommonModule],
  template: `
  <div style="max-width:700px;margin:16px auto;padding:16px;border:1px solid #eee;border-radius:8px">
    <h2>Upload Tariff Rules (JSON)</h2>
    <input type="file" (change)="onFile($event)" accept="application/json" />
    <pre>{{message}}</pre>
  </div>
  `
})
export class AdminRulesUploadComponent {
  message = '';

  constructor(private api: ApiService){}

  onFile(ev: any){
    const file = ev.target.files?.[0];
    if(!file) return;
    this.api.uploadRules(file).subscribe({
      next: (res) => this.message = JSON.stringify(res, null, 2),
      error: (err) => this.message = 'Upload failed: ' + (err?.error || err?.message || 'unknown')
    });
  }
}