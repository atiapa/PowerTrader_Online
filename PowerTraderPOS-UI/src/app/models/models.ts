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

// Accounts Creation Model
export interface AccountsCreation {
  refno: number;
  accountGroup?: string;
  accountName?: string;
  accountNr?: string;
  openingBalance?: number;
  nature?: string;
  creditLimit?: number;
  narration?: string;
  branchcode?: string;
  entryID?: string;
  entryDate?: string;
  tin?: string;
  accountType?: string;
  accountStatus?: string;
  isStatus?: string;
  bsStatus?: string;
  cfStatus?: string;
  reStatus?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CreateAccountsCreationDto {
  accountGroup: string;
  accountName: string;
  accountNr: string;
  openingBalance?: number;
  nature: string;
  creditLimit?: number;
  narration?: string;
  tin?: string;
  accountType: string;
  accountStatus?: string;
  isStatus?: string;
  bsStatus?: string;
  cfStatus?: string;
  reStatus?: string;
}

export interface UpdateAccountsCreationDto {
  accountGroup?: string;
  accountName?: string;
  openingBalance?: number;
  nature?: string;
  creditLimit?: number;
  narration?: string;
  accountStatus?: string;
  isStatus?: string;
  bsStatus?: string;
  cfStatus?: string;
  reStatus?: string;
}

// ATC (Authority to Carry) Model
export interface AtcTbl {
  refNo: number;
  atcNumber?: string;
  dateCreated?: Date;
  timeCreated?: string;
  createdByID?: string;
  dateModified?: Date;
  timeModified?: string;
  modifiedByID?: string;
  organization?: string;
  contactPerson?: string;
  deliveryAddress?: string;
  phoneNumber?: string;
  driversID?: string;
  driversName?: string;
  driversContact?: string;
  driverAssistantName?: string;
  driverAssistantID?: string;
  driverAssistantContact?: string;
  digitalAddress?: string;
  plateNumber?: string;
  vehicleOwnersNumber?: string;
  insuranceExpiryDate?: Date;
  roadworthyExpiryDate?: Date;
  invoiceNr?: string;
  fleetNumber?: string;
  fleetSection?: string;
  shipToParty?: string;
  soldToParty?: string;
  distance?: number;
  addictionalDistance?: number;
  totalDistance?: number;
  litrePerKM?: number;
  totalFuelAllowed?: number;
  eaDate?: Date;
  aaDate?: Date;
  organisationCode?: string;
  branchcode?: string;
}

export interface CreateAtcDto {
  atcNumber: string;
  organization: string;
  contactPerson: string;
  deliveryAddress?: string;
  phoneNumber?: string;
  driversID: string;
  driversName: string;
  driversContact?: string;
  driverAssistantName?: string;
  driverAssistantID?: string;
  driverAssistantContact?: string;
  digitalAddress?: string;
  plateNumber: string;
  vehicleOwnersNumber?: string;
  insuranceExpiryDate?: Date;
  roadworthyExpiryDate?: Date;
  invoiceNr?: string;
  fleetNumber?: string;
  fleetSection?: string;
  shipToParty?: string;
  soldToParty?: string;
  distance?: number;
  addictionalDistance?: number;
  totalDistance?: number;
  litrePerKM?: number;
  totalFuelAllowed?: number;
  eaDate?: Date;
  aaDate?: Date;
}

export interface UpdateAtcDto {
  organization?: string;
  contactPerson?: string;
  deliveryAddress?: string;
  phoneNumber?: string;
  driversID?: string;
  driversName?: string;
  driversContact?: string;
  driverAssistantName?: string;
  driverAssistantID?: string;
  driverAssistantContact?: string;
  digitalAddress?: string;
  plateNumber?: string;
  vehicleOwnersNumber?: string;
  insuranceExpiryDate?: Date;
  roadworthyExpiryDate?: Date;
  fleetNumber?: string;
  fleetSection?: string;
  shipToParty?: string;
  soldToParty?: string;
  distance?: number;
  addictionalDistance?: number;
  totalDistance?: number;
  litrePerKM?: number;
  totalFuelAllowed?: number;
  eaDate?: Date;
  aaDate?: Date;
}
