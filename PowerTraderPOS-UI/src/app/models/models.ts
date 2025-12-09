export interface LoginRequest {
  username: string;
  pin: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
  fullName: string;
  role: string;
  tenantId: number;
  tenantName: string;
}

export interface User {
  userId: number;
  username: string;
  fullName: string;
  role: string;
  tenantId: number;
  tenantName: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  description?: string;
  price: number;
  cost: number;
  stockQuantity: number;
  category?: string;
  isActive: boolean;
}

export interface SaleItem {
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  netPrice: number;
}

export interface CreateSaleRequest {
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  netAmount: number;
  paymentMethod: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  items: SaleItem[];
}

export interface Sale {
  id: number;
  transactionNumber: string;
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  netAmount: number;
  paymentMethod: string;
  status: string;
  transactionDate: Date;
  customerName?: string;
  customerPhone?: string;
  items: SaleItem[];
}
