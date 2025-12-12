// ============================================
// Authentication & User Models (Based on users_tbl entity from database-models.ts)
// ============================================

import { users_tbl, USERS } from './database-models';

/**
 * LoginRequest interface for authentication
 * Supports both username/password and PIN-based authentication
 */
export interface LoginRequest {
  username?: string;
  password?: string;
  pin?: string;
}

/**
 * LoginResponse interface
 * Returns JWT token and user information based on users_tbl entity
 */
export interface LoginResponse {
  token: string;
  user: User;
  expiresIn?: number;
}

/**
 * Extended User interface based on users_tbl entity
 * Includes additional properties for application-specific needs
 */
export interface User extends users_tbl {
  role?: string;           // User role for routing (Admin, Sales, Finance, etc.)
  fullName?: string;       // Computed full name for display
  tenantId?: number;       // Multi-tenant support
  tenantName?: string;     // Tenant display name
}

// ============================================
// Product & Inventory Models (Based on database-models.ts entities)
// ============================================

import { Retail_Items, Categories, SubCategory } from './database-models';

/**
 * RetailItem interface based on Retail_Items table from database-models.ts
 * Used for POS retail sales point operations
 */
export interface RetailItem extends Retail_Items {
  // Retail_Items already contains all necessary fields from the database
  // This extends it for any additional application-specific properties if needed
}

/**
 * Category interface based on Categories table from database-models.ts
 */
export interface Category extends Categories {
  // Categories already contains all necessary fields from the database
}

/**
 * Subcategory interface based on SubCategory table from database-models.ts
 */
export interface Subcategory extends SubCategory {
  // SubCategory already contains all necessary fields from the database
}

/**
 * Generic Product interface for backwards compatibility
 */
export interface Product {
  id?: number;
  productID?: string;
  productName?: string;
  category?: string;
  subcategory?: string;
  unitPrice?: number;
  wholesalePrice?: number;
  costPrice?: number;
  barcode?: string;
  unitsInStock?: number;
  reorderLevel?: number;
  discontinued?: boolean;
  photo?: string;
  organisationId?: number;
  branchId?: number;
}

// ============================================
// Sales Models
// ============================================

export interface Sale {
  id?: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  discount?: number;
  tax?: number;
  extendedPrice?: number;
  entryID?: string;
  entryDate?: Date;
  tillName?: string;
  session?: string;
  organisationId?: number;
  branchId?: number;
}

export interface CreateSaleRequest {
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  netAmount: number;
  paymentMethod: string;
  customerName?: string;
  customerPhone?: string;
  items: {
    productName: string;
    productCode: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discountAmount: number;
    netPrice: number;
  }[];
}

export interface ProductSearchRequest {
  searchTerm?: string;
  categoryID?: string;
  subcategory?: string;
  barcode?: string;
  organisationId?: number;
  branchId?: number;
}

// ============================================
// Account Models
// ============================================

export interface AccountGroupMaster {
  under?: number;
  primaryGroup?: string;
  accountType?: string;
  groupName?: string;
  nature?: string;
  comments?: string;
  superid?: number;
  branchcode?: string;
  accountStatus?: string;
  isStatus?: string;
  bsStatus?: string;
  cfStatus?: string;
  reStatus?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface AccountCreation {
  sNo?: number;
  accountGroup?: string;
  accountName?: string;
  accountnr?: string;
  contactPerson?: string;
  physicalAddress?: string;
  postalAddress?: string;
  phone?: string;
  fax?: string;
  email?: string;
  dated?: Date;
  status?: string;
  openingBalance?: number;
  obNature?: string;
  creditLimit?: number;
  comments?: string;
  superGroup?: string;
  under?: string;
  closingBalance?: number;
  cbNature?: string;
  branchcode?: string;
  entryid?: string;
  entrydate?: string;
}

export interface AccountLedgerTbl {
  refno?: number;
  transDate?: Date;
  department?: string;
  voucherType?: string;
  accountNr?: string;
  accountName?: string;
  debit?: number;
  credit?: number;
  balance?: number;
  accountingStatus?: string;
  nature?: string;
  narration?: string;
  voucherNr?: string;
  accountGroup?: string;
  entryID?: string;
  month?: string;
  year?: number;
  accountType?: string;
  accountStatus?: string;
}

export interface AccountCreationEnhanced extends AccountCreation {
  organisationId?: number;
  branchId?: number;
}

export interface CreateAccountCreationEnhancedDto {
  accountGroup: string;
  accountName: string;
  accountnr?: string;
  contactPerson?: string;
  physicalAddress?: string;
  postalAddress?: string;
  phone?: string;
  fax?: string;
  email?: string;
  status?: string;
  openingBalance?: number;
  obNature?: string;
  creditLimit?: number;
  comments?: string;
  superGroup?: string;
  under?: string;
  organisationId?: number;
  branchId?: number;
}

export interface UpdateAccountCreationEnhancedDto extends Partial<CreateAccountCreationEnhancedDto> {
  sNo: number;
}
