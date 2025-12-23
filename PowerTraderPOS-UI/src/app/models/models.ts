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

// Open Balance Model
export interface OpenBalance {
  refno: number;
  date?: Date;
  accountNr?: string;
  accountType?: string;
  accountName?: string;
  debit?: number;
  credit?: number;
  narrations?: string;
  entryID?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CreateOpenBalanceDto {
  date: Date;
  accountNr: string;
  accountType: string;
  accountName: string;
  debit?: number;
  credit?: number;
  narrations?: string;
}

export interface UpdateOpenBalanceDto {
  date?: Date;
  accountType?: string;
  accountName?: string;
  debit?: number;
  credit?: number;
  narrations?: string;
}

// Order Reversed Model
export interface OrderReversed {
  refno: number;
  invoicenr?: string;
  productID?: string;
  productName?: string;
  quantity?: string;
  tillName?: string;
  session?: Date;
  time?: string;
  sellingUnit?: string;
  attendant?: string;
  supervisor?: string;
  ordered?: string;
  reason?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CreateOrderReversedDto {
  invoicenr: string;
  productID: string;
  productName: string;
  quantity: string;
  tillName?: string;
  session: Date;
  time?: string;
  sellingUnit?: string;
  attendant: string;
  supervisor?: string;
  ordered?: string;
  reason: string;
}

export interface UpdateOrderReversedDto {
  quantity?: string;
  supervisor?: string;
  reason?: string;
}

// Orders Table Model
export interface OrdersTbl {
  refNo: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  qtyOrdered?: number;
  qtySupplied?: number;
  entryID?: string;
  customerID?: string;
  customername?: string;
  entryDate?: Date;
  tillName?: string;
  time?: string;
  session?: string;
  status?: string;
  remarks?: string;
  supplierID?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CreateOrdersDto {
  invoiceNr: string;
  productID: string;
  productName: string;
  qtyOrdered: number;
  qtySupplied?: number;
  customerID?: string;
  customername?: string;
  entryDate: Date;
  tillName?: string;
  time?: string;
  session?: string;
  status?: string;
  remarks?: string;
  supplierID?: string;
}

export interface UpdateOrdersDto {
  qtySupplied?: number;
  status?: string;
  remarks?: string;
}

// Organisation Information Model
export interface OrganisationInformation {
  refNo: number;
  organisationName?: string;
  postalAddress?: string;
  physicalLocation?: string;
  city?: string;
  regionOrState?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  taxIdentificationNumber?: string;
  registrationNumber?: string;
  dateEstablished?: Date;
  numberOfEmployees?: number;
  businessType?: string;
  industryType?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  logo?: string;
  description?: string;
  isActive?: boolean;
  organisationCode?: string;
}

export interface CreateOrganisationDto {
  organisationName: string;
  postalAddress?: string;
  physicalLocation?: string;
  city?: string;
  regionOrState?: string;
  country: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  taxIdentificationNumber?: string;
  registrationNumber?: string;
  dateEstablished?: Date;
  numberOfEmployees?: number;
  businessType?: string;
  industryType?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  logo?: string;
  description?: string;
}

export interface UpdateOrganisationDto {
  organisationName?: string;
  postalAddress?: string;
  physicalLocation?: string;
  city?: string;
  regionOrState?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  taxIdentificationNumber?: string;
  registrationNumber?: string;
  dateEstablished?: Date;
  numberOfEmployees?: number;
  businessType?: string;
  industryType?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  logo?: string;
  description?: string;
  isActive?: boolean;
}

// Account Group Master
export interface AccountGroupMaster {
  under: number;
  primaryGroup?: string;
  accountType?: string;
  groupName?: string;
  nature?: string;
  comments?: string;
  superId?: number;
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

export interface CreateAccountGroupMasterDto {
  primaryGroup: string;
  accountType: string;
  groupName: string;
  nature: string;
  superId?: number;
  comments?: string;
}

export interface UpdateAccountGroupMasterDto {
  primaryGroup?: string;
  accountType?: string;
  groupName?: string;
  nature?: string;
  superId?: number;
  comments?: string;
  accountStatus?: string;
}

// Account Creation (enhanced)
export interface AccountCreationEnhanced {
  sNo: number;
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
  entryId?: string;
  entryDate?: string;
}

export interface CreateAccountCreationEnhancedDto {
  accountGroup: string;
  accountName: string;
  accountnr: string;
  openingBalance?: number;
  obNature?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
}

export interface UpdateAccountCreationEnhancedDto {
  accountGroup?: string;
  accountName?: string;
  contactPerson?: string;
  physicalAddress?: string;
  postalAddress?: string;
  phone?: string;
  fax?: string;
  email?: string;
  status?: string;
  creditLimit?: number;
  comments?: string;
}

// Account Ledger
export interface AccountLedger {
  refno: number;
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
  isStatus?: string;
  bsStatus?: string;
  cfStatus?: string;
  reStatus?: string;
  organisationCode?: string;
  organisationName?: string;
  branchcode?: string;
  branchName?: string;
}

export interface CreateAccountLedgerDto {
  transDate: Date;
  accountNr: string;
  accountName: string;
  voucherType: string;
  voucherNr: string;
  debit: number;
  credit: number;
  narration?: string;
  department?: string;
}

export interface UpdateAccountLedgerDto {
  transDate?: Date;
  debit?: number;
  credit?: number;
  narration?: string;
  accountingStatus?: string;
}
