import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TenantContextService } from '../services/tenant-context.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tenantContext = inject(TenantContextService);
  const token = authService.getToken();

  // Clone request and add headers
  let modifiedReq = req;

  if (token) {
    const headers: any = {
      Authorization: `Bearer ${token}`
    };

    // Add tenant info to headers for backend validation
    if (tenantContext.hasContext()) {
      const tenant = tenantContext.getTenantContext();
      if (tenant) {
        headers['X-Organisation-Code'] = tenant.organisationCode;
        headers['X-Branch-Code'] = tenant.branchCode;
        headers['X-User-Id'] = tenant.userId;
      }
    }

    modifiedReq = req.clone({ setHeaders: headers });
  }

  return next(modifiedReq);
};
