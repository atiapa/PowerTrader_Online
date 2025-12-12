import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantContextService } from '../../services/tenant-context.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tenant-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tenant-info" *ngIf="tenantContext">
      <div class="tenant-details">
        <div class="tenant-item">
          <span class="label">Organisation:</span>
          <span class="value">{{ tenantContext.organisationName }} ({{ tenantContext.organisationCode }})</span>
        </div>
        <div class="tenant-item">
          <span class="label">Branch:</span>
          <span class="value">{{ tenantContext.branchName }} ({{ tenantContext.branchCode }})</span>
        </div>
        <div class="tenant-item">
          <span class="label">User:</span>
          <span class="value">{{ tenantContext.userName }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tenant-info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 8px 16px;
      color: white;
      border-bottom: 3px solid #5a67d8;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .tenant-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      gap: 24px;
      flex-wrap: wrap;
    }

    .tenant-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .label {
      font-weight: 600;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .value {
      font-size: 0.875rem;
      font-weight: 500;
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    @media (max-width: 768px) {
      .tenant-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .tenant-item {
        width: 100%;
      }
    }
  `]
})
export class TenantInfoComponent implements OnInit {
  tenantContext: any = null;

  constructor(
    private tenantContextService: TenantContextService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to tenant context changes
    this.tenantContextService.tenantContext$.subscribe(context => {
      this.tenantContext = context;
    });
  }
}
