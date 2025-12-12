// Comprehensive Database Models for PowerTrader POS System
// Auto-generated from database schema specifications

// ==================== ACCOUNT & FINANCE MODELS ====================

export interface AccountGroupMaster {
  under: number;
  primaryGroup?: string;
  account_Type?: string;
  group_Name?: string;
  nature?: string;
  comments?: string;
  superid?: number;
  branchcode?: string;
  accountStatus?: string;
  is_Status?: string;
  bs_Status?: string;
  cf_Status?: string;
  re_Status?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface AccountCreation {
  s_No: number;
  accountGroup?: string;
  accountName?: string;
  accountnr?: string;
  contactPerson?: string;
  physical_address?: string;
  postal_address?: string;
  phone?: string;
  fax?: string;
  e_mail?: string;
  dated?: Date;
  status?: string;
  opening_Balance?: number;
  obNature?: string;
  credit_limit?: number;
  comments?: string;
  super_Group?: string;
  under?: string;
  closing_Balance?: number;
  cbNature?: string;
  branchcode?: string;
  entryid?: string;
  entrydate?: string;
}

export interface AccountLedgerTbl {
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
  description?: string;
  entryDate?: Date;
  time?: string;
  is_Status?: string;
  bs_Status?: string;
  cf_Status?: string;
  re_Status?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
  branchCode?: string;
}

// ==================== ATC & FLEET MODELS ====================

export interface ATCTbl {
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
  etaTime?: string;
  ataTime?: string;
  confirmationOfReceipt?: string;
  confirmationContact?: string;
  confirmedBy?: string;
  supplierName?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== HR & ATTENDANCE MODELS ====================

export interface AttendanceTbl {
  refno: number;
  staffId?: string;
  name?: string;
  barcode?: string;
  position?: string;
  date?: Date;
  login_Time?: string;
  logout_Time?: string;
  logged?: string;
  logout_Date?: string;
  minToLate?: string;
  month?: string;
  year?: string;
  post?: string;
  fpTemplate?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface StaffInformation {
  refno: number;
  staffID?: string;
  title?: string;
  surname?: string;
  otherNames?: string;
  gender?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  nationalilty?: string;
  maritalStatus?: string;
  spouseName?: string;
  nationalID?: string;
  socialSecurityNumber?: string;
  streetAddress?: string;
  city?: string;
  poBox?: string;
  townCity?: string;
  country?: string;
  homePhone?: string;
  cellPhone?: string;
  email?: string;
  socialHomepage?: string;
  dateOfEmployment?: Date;
  designation?: string;
  rank?: string;
  department?: string;
  highestEducation?: string;
  initutionsAttended?: string;
  referenceName?: string;
  relationship?: string;
  refContactAddress?: string;
  refContactNumber?: string;
  photo?: any;
  comments?: string;
  entryID?: string;
  entryDate?: Date;
  ecount?: number;
  homeTown?: string;
  nextOfKins?: string;
  kinsContactNr?: string;
  relationshipToKins?: string;
  kinsAddress?: string;
  staffWorkingHours?: number;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface DutyRoaster {
  refno: number;
  staffID?: string;
  name?: string;
  designation?: string;
  day1?: string;
  day1_Time?: string;
  day2?: string;
  day2_Time?: string;
  day3?: string;
  day3_Time?: string;
  day4?: string;
  day4_Time?: string;
  day5?: string;
  day5_Time?: string;
  day6?: string;
  day6_Time?: string;
  day7?: string;
  day7_Time?: string;
  minToLate?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== AUDIT & SYSTEM MODELS ====================

export interface AuditT {
  refNo: number;
  entryDate?: Date;
  date1?: Date;
  date2?: Date;
  report?: string;
  entryID?: string;
  ecount?: number;
  narration?: string;
  dateEnded?: string;
  time?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== BANKING MODELS ====================

export interface BankAccounts {
  refNo: number;
  bankName?: string;
  bankBranch?: string;
  accountName?: string;
  accounTNumber?: string;
  accountType?: string;
  currency?: string;
  remarks?: string;
  entryID?: string;
  entryDate?: Date;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ChequeTransaction {
  refno: number;
  voucherType?: string;
  voucherNumber?: string;
  bankAccountNr?: string;
  accountName?: string;
  bankName?: string;
  branch?: string;
  accountType?: string;
  chequeNumber?: string;
  chequeDate?: Date;
  chequeClearingDate?: Date;
  paid_ReceicedBy?: string;
  clearingDays?: number;
  authorizedBy?: string;
  amount?: number;
  status?: string;
  statusUpdatedDate?: Date;
  returnedCharges?: number;
  branchcode?: string;
  entryID?: string;
  entryDate?: Date;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== PRODUCT & INVENTORY MODELS ====================

export interface Products {
  refno: number;
  productID?: string;
  productName?: string;
  batchNo?: string;
  manufacturer?: string;
  supplierID?: string;
  categoryID?: string;
  subcategory?: string;
  quantityPerUnit?: string;
  unitPrice?: number;
  wholesalesprice?: number;
  hi_Unitprice?: number;
  discountPercentage?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: string;
  entryID?: string;
  costPrice?: number;
  profitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  photo?: any;
  entryDate?: Date;
  expiryDate?: Date;
  branchcode?: string;
  originalunitprice?: number;
  sellingUnit?: string;
  max_Stock?: number;
  countryoforigin?: string;
  retailUnitInPacks?: number;
  qtyInCarton?: number;
  cartonUnit?: string;
  qtyPerPortion?: number;
  retailSellingUnit?: string;
  store?: string;
  allowCustomPricing?: string;
  retailStockUnit?: number;
  shotprice?: number;
  productRating?: string;
  portionCost?: number;
  portionProfit?: number;
  modifiedBy?: string;
  modifiedDate?: Date;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface RetailItems {
  refno: number;
  productID?: string;
  productName?: string;
  batchNo?: string;
  manufacturer?: string;
  supplierID?: string;
  categoryID?: string;
  subcategory?: string;
  quantityPerUnit?: string;
  unitPrice?: number;
  wholesalesprice?: number;
  hi_Unitprice?: number;
  discountPercentage?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: string;
  entryID?: string;
  costPrice?: number;
  profitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  photo?: any;
  entryDate?: Date;
  expiryDate?: Date;
  branchcode?: string;
  originalunitprice?: number;
  sellingUnit?: string;
  qtyPerPortion?: number;
  max_Stock?: number;
  store?: string;
  productRating?: number;
  countryoforigin?: string;
  retailUnitInPacks?: number;
  allowCustomPricing?: string;
  retailStockUnit?: number;
  shotprice?: number;
  shotMeasure?: number;
  lastReportStockDate?: Date;
  qtyInCarton?: number;
  cartonUnit?: string;
  retailSellingUnit?: string;
  modifiedBy?: string;
  modifiedDate?: Date;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface Categories {
  categoryID: number;
  categoryName?: string;
  description?: string;
  buttoncolor?: string;
  fontsize?: string;
  organisationName?: string;
  branchcode?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface SubCategory {
  refno: number;
  subcategory?: string;
  description?: string;
  category?: string;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== SALES MODELS ====================

export interface SalesDetails {
  refNo: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  batchNo?: string;
  hi_Unitprice?: number;
  unitPrice?: number;
  quantity?: number;
  cost?: number;
  discount?: number;
  extendedPrice?: number;
  entryID?: string;
  customerID?: string;
  customerName?: string;
  entryDate?: Date;
  remarks?: string;
  prevStock?: number;
  prevReorder?: number;
  costPrice?: number;
  profitOrLoss?: number;
  amountpaid?: number;
  change_Balance?: number;
  tax?: number;
  attendant?: string;
  tillName?: string;
  time?: string;
  session?: Date;
  barcodenr?: string;
  salesType?: string;
  amountInwords?: string;
  barcodeimage?: any;
  ordernr?: string;
  qtyremaining?: number;
  qtyreturned?: number;
  previous_Balance?: number;
  current_Balance?: number;
  currency?: string;
  description?: string;
  store?: string;
  patientID?: string;
  salesRep?: string;
  branchCode?: string;
  taxType?: string;
  tax1Rate?: number;
  tax1Amount?: number;
  tax2Rate?: number;
  tax2Amount?: number;
  tax3Rate?: number;
  tax3Amount?: number;
  tax4Rate?: number;
  tax4Amount?: number;
  taxRate?: number;
  taxable?: number;
  supplierID?: string;
  loyaltyPoints?: number;
  loyaltyCardNumber?: string;
  loyaltyPointsRedeemed?: number;
  loyaltyAmountRedeemed?: number;
  discountType?: string;
  customerAccountNr?: string;
  itemType?: string;
  sellingUnit?: string;
  volume?: string;
  categoryID?: string;
  max_Stock?: number;
  month?: string;
  monthYear?: string;
  subcategory?: string;
  year?: number;
  customerDetails?: string;
  staffID?: string;
  firstName?: string;
  lastName?: string;
  day?: string;
  tcValue?: number;
  tradingCurrency?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CashSalesPending {
  refno: number;
  invoicenr?: string;
  productID?: string;
  productName?: string;
  unitPrice?: number;
  quantity?: number;
  cost?: number;
  discount?: number;
  tax?: number;
  extendedprice?: number;
  entryid?: string;
  customerAccountNr?: string;
  customerID?: string;
  customerName?: string;
  entrydate?: Date;
  prevstock?: number;
  prevreorder?: number;
  profitOrLoss?: number;
  costPrice?: number;
  wholesalesprice?: number;
  accountType?: string;
  hi_UnitPrice?: number;
  batchNo?: string;
  attendant?: string;
  tillName?: string;
  time?: string;
  session?: string;
  barcodenr?: string;
  barcodeimage?: any;
  ordernr?: string;
  store?: string;
  sellingUnit?: string;
  volume?: string;
  itemType?: string;
  description?: string;
  viewState?: string;
  taxType?: string;
  tax1Rate?: number;
  tax1Amount?: number;
  tax2Rate?: number;
  tax2Amount?: number;
  tax3Rate?: number;
  tax3Amount?: number;
  tax4Rate?: number;
  tax4Amount?: number;
  taxRate?: number;
  taxable?: number;
  supplierID?: string;
  loyaltyPoints?: number;
  loyaltyCarNumber?: string;
  categoryID?: string;
  max_Stock?: number;
  subcategory?: string;
  customerDetails?: string;
  qtyPerUnit?: number;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
  branchcode?: string;
}

// ==================== CUSTOMER MODELS ====================

export interface CustomerInfo {
  refno: number;
  accountName?: string;
  surname?: string;
  othernames?: string;
  accountNr?: string;
  address?: string;
  city_Town?: string;
  region_State?: string;
  phoneNr?: string;
  creditLimit?: number;
  customerType?: string;
  sales_Rep?: string;
  openingBalance?: number;
  nature?: string;
  accountGroup?: string;
  entryDate?: Date;
  entryID?: string;
  branchcode?: string;
  narrations?: string;
  companyname?: string;
  digitalAddress?: string;
  email?: string;
  openingPoints?: number;
  pointsToDate?: number;
  barcodenr?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== SUPPLIER & VENDOR MODELS ====================

export interface Suppliers {
  s_No: number;
  supplierID?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  postalAddress?: string;
  city?: string;
  region?: string;
  physicaladdress?: string;
  country?: string;
  phone?: string;
  cellPhone?: string;
  email?: string;
  fax?: string;
  homePage?: string;
  website?: string;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface VendorCreation {
  s_No: number;
  account_group?: string;
  account_name?: string;
  account_number?: string;
  contactperson?: string;
  physical_address?: string;
  postal_Address?: string;
  city_Town?: string;
  region_state?: string;
  phone?: string;
  fax?: string;
  e_mail?: string;
  dated?: string;
  status?: string;
  opening_balance?: number;
  obnature?: string;
  credit_limit?: number;
  narrations?: string;
  super_group?: string;
  under?: string;
  tin?: string;
  branchcode?: string;
  entryid?: string;
  entrydate?: Date;
  digitalAddress?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== PURCHASE MODELS ====================

export interface PurchaseOrderTbl {
  refno: number;
  orderID?: string;
  supplier?: string;
  productName?: string;
  sellingUnit?: string;
  quantityPerUnit?: string;
  unitPrice?: number;
  quantity?: number;
  amount?: number;
  expectedDeliveryDate?: Date;
  dateAdded?: Date;
  timeAdded?: string;
  entryID?: string;
  dateModified?: Date;
  timeModified?: string;
  modifiedID?: string;
  barcodenr?: string;
  barcodeImage?: any;
  authorizedBy?: string;
  lastPurchasedQty?: number;
  lastPurchasedDate?: Date;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface PurchasesInvoiceMaster {
  refNo: number;
  productID?: string;
  productName?: string;
  manufacturer?: string;
  invoiceNr?: string;
  invoiceDate?: string;
  expiryDate?: string;
  supplierID?: string;
  categoryID?: string;
  quantityPerUnit?: string;
  unitPrice?: number;
  wholesaleprice?: number;
  discountPercentage?: number;
  quantity?: number;
  entryID?: string;
  entryDate?: Date;
  costPricePerUnit?: number;
  month?: string;
  year?: string;
  status?: string;
  confirmBy?: string;
  confirmRemarks?: string;
  branchCode?: string;
  itemname?: string;
  supplierName?: string;
  discount?: number;
  taxName?: string;
  tax_Amount?: number;
  description?: string;
  amount?: number;
  receiptNumber?: string;
  receivedBy?: string;
  portions?: number;
  batchNo?: string;
  tradingCurrency?: string;
  tcValue?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== ORDERS MODELS ====================

export interface OpenBalanceTbl {
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

export interface OrderReversedTbl {
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

export interface OrdersTbl {
  refNo: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  qty_Ordered?: number;
  qty_Supplied?: number;
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

// ==================== ORGANIZATION MODELS ====================

export interface OrganisationInformation {
  refNo: number;
  organisationName?: string;
  postalAddress?: string;
  physicalLocation?: string;
  city?: string;
  regionOrState?: string;
  country?: string;
  officePhone?: string;
  cellPhone?: string;
  fax?: string;
  email?: string;
  website?: string;
  logo?: any;
  remarks?: string;
  tin?: string;
  receiptNote?: any;
  branchcode?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface Branches {
  refNo: number;
  organisationName?: string;
  organisationCode?: string;
  postalAddress?: string;
  physicalLocation?: string;
  city?: string;
  regionOrState?: string;
  country?: string;
  officePhone?: string;
  cellPhone?: string;
  fax?: string;
  email?: string;
  website?: string;
  remarks?: string;
  tin?: string;
  branchName?: string;
  branchcode?: string;
}

// ==================== WAREHOUSE & STOCK MODELS ====================

export interface WarehouseTbl {
  refno: number;
  productID?: string;
  productName?: string;
  batchNo?: string;
  manufacturer?: string;
  supplierID?: string;
  categoryID?: string;
  subcategory?: string;
  quantityPerUnit?: string;
  unitPrice?: number;
  wholesalesprice?: number;
  hi_Unitprice?: number;
  discountPercentage?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: string;
  entryID?: string;
  costPrice?: number;
  profitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  photo?: any;
  entryDate?: Date;
  expiryDate?: Date;
  branchcode?: string;
  originalunitprice?: number;
  sellingUnit?: string;
  max_Stock?: number;
  countryoforigin?: string;
  retailUnitInPacks?: number;
  qtyInCarton?: number;
  cartonUnit?: string;
  qtyPerPortion?: number;
  retailSellingUnit?: string;
  store?: string;
  allowCustomPricing?: string;
  retailStockUnit?: number;
  shotprice?: number;
  portionCost?: number;
  portionProfit?: number;
  storage_Two?: number;
  storage_Three?: number;
  storage_Four?: number;
  storage_five?: number;
  storage_Six?: number;
  modifiedBy?: string;
  modifiedDate?: Date;
  wholesaleStock?: number;
  retailStock?: number;
  otherStoreStock?: number;
  wholesaleStockOnOrder?: number;
  retailStockOnOrder?: number;
  otherStoreStockOnOrder?: number;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface StockMaster {
  refno: number;
  transDate?: Date;
  voucherNr?: string;
  productName?: string;
  openingStock?: number;
  purchase?: number;
  purchaseReturn?: number;
  inwardTransfer?: number;
  inward?: number;
  sales?: number;
  salesReturn?: number;
  outwardTransfer?: number;
  outward?: number;
  balance?: number;
  narration?: string;
  entryID?: string;
  batchNo?: string;
  expiryDate?: string;
  unitInStock?: number;
  newprice?: number;
  lastprice?: number;
  store?: string;
  unitsPerCarton?: number;
  productID?: string;
  branchcode?: string;
  session?: Date;
  tcValue?: number;
  tradingCurrency?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface StockRecord {
  refno: number;
  transDate?: Date;
  voucherNr?: string;
  manufacturer?: string;
  supplier?: string;
  invoice_ReceiptNr?: string;
  productid?: string;
  productName?: string;
  description?: string;
  qty?: number;
  unitprice?: number;
  amount?: number;
  costPrice?: number;
  profitOrLoss?: number;
  currentExpiryDate?: string;
  reciptDate?: string;
  entryID?: string;
  narration?: string;
  store?: string;
  invoicenr?: string;
  invoicedate?: Date;
  expirydate?: string;
  supplierID?: string;
  suppliername?: string;
  categoryID?: string;
  quantityPerUnit?: string;
  wholesaleprice?: number;
  discount?: number;
  quantity_IN?: number;
  quantity_Out?: number;
  entryDate?: string;
  taxName?: string;
  tax_Amount?: number;
  month?: string;
  year?: number;
  receiptNumber?: string;
  receivedBy?: string;
  purchaseID?: string;
  portions?: number;
  portionIn?: number;
  portionOut?: number;
  portionMeasure?: number;
  portionPerUnit?: number;
  branchcode?: string;
  batchNo?: string;
  session?: Date;
  tcValue?: number;
  tradingCurrency?: string;
  voucherType?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== VOUCHER MODELS ====================

export interface PaymentVoucher {
  refno: number;
  voucherNumber?: string;
  paid_To?: string;
  address?: string;
  contacts?: string;
  amount?: number;
  description?: string;
  debitAccountName?: string;
  debitAccountNumber?: string;
  department?: string;
  authorizeddBy?: string;
  creditAccountName?: string;
  creditAccountnumber?: string;
  bankAccountNr?: string;
  bankAccountName?: string;
  chequeNumber?: string;
  chequeDate?: string;
  clearingDays?: string;
  branchCode?: string;
  entryID?: string;
  entryDate?: Date;
  balance?: number;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ReceiptVoucher {
  refno: number;
  receiptType?: string;
  voucherNumber?: string;
  receivedFrom?: string;
  address?: string;
  contacts?: string;
  amount?: number;
  description?: string;
  department?: string;
  creditAccountName?: string;
  creditAccountnumber?: string;
  creditBankAccountNr?: string;
  creditBankName?: string;
  creditChequeNumber?: string;
  creditChequeClearingDate?: string;
  crClearDays?: string;
  debitAccountName?: string;
  debitAccountNumber?: string;
  debitBankAccountNr?: string;
  debitBankName?: string;
  chequeNumber?: string;
  chequeDate?: string;
  clearingDays?: string;
  authorizeddBy?: string;
  branchCode?: string;
  entryID?: string;
  entryDate?: Date;
  balance?: number;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== SYSTEM & SETTINGS MODELS ====================

export interface TblSettings {
  refNo: number;
  countryCode?: string;
  smsPrefix?: string;
  currency?: string;
  entryvoucher_ad_Image?: any;
  taxicard_ad_Image?: any;
  taxInstruction?: any;
  recieptAD?: any;
  tax1Name?: string;
  tax1Rate?: number;
  tax2Name?: string;
  tax2Rate?: number;
  tax3Name?: string;
  tax3Rate?: number;
  tax4Name?: string;
  tax4Rate?: number;
  vat_Rate?: number;
  taxType?: string;
  taxDecimals?: number;
  reportEmail?: string;
  alternativeEmail?: string;
  alternativePass?: string;
  billItemReversing?: string;
  negativeStock?: string;
  smtp?: string;
  cardPayment?: string;
  reverseUnprinted?: string;
  printToKitchen?: string;
  printToBar?: string;
  onlinePayment?: string;
  taxingtype?: string;
  jobcardCost?: number;
  multipayment?: string;
  jobcard?: string;
  retailMultiPrinter?: string;
  litrePerKM?: number;
  charSpacing?: number;
  displayComport?: string;
  retailActive?: string;
  wholesaleActive?: string;
  branchCode?: string;
  searchPriority?: string;
  syncOnline?: string;
  smtpPort?: number;
  forcePurchaseEntry?: string;
  pointsPerTransaction?: number;
  valuePerPoint?: number;
  pointsToRedeem?: number;
  taxRate1?: number;
  taxRate2?: number;
  taxRate3?: number;
  taxRate4?: number;
  taxRateCap?: number;
  receiptNote?: string;
  purchasedPerPoint?: number;
  receiptHeader?: string;
  redeemPointThreshold?: number;
  authorizeRetailPaymentPause?: string;
  posLockTime?: number;
  posLockAfterSale?: string;
  retailPoint?: string;
  wholesale1Point?: string;
  wholesale2Point?: string;
  milking?: string;
  portionType?: string;
  mandatoryReceipt?: string;
  portionCategory?: string;
  holdOrder?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface Users {
  staffID: string;
  surname?: string;
  otherNames?: string;
  username?: string;
  password?: string;
  dob?: Date;
  designation?: string;
  ulevel?: number;
  barcodenr?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== GIFT CARD MODELS ====================

export interface GiftCardTbl {
  refno: number;
  accountNr?: string;
  accountName?: string;
  vouchertype?: string;
  voucherNumber?: string;
  cardName?: string;
  barcodeNr?: string;
  barcodeimage?: any;
  cardValue?: number;
  expiryDate?: Date;
  number?: string;
  status?: string;
  entryID?: string;
  entryDate?: Date;
  soldByID?: string;
  soldDate?: Date;
  soldTime?: string;
  usedDate?: Date;
  usedTime?: string;
  userID?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== EXPENSE MODELS ====================

export interface ExpensesExpenditure {
  refNo: number;
  transDate?: Date;
  chcode?: string;
  department?: string;
  groups_Service?: string;
  typeOfExpenses?: string;
  descriptionOrProducts?: string;
  unitPrice?: number;
  quantity?: number;
  amount?: number;
  issuedID?: string;
  receivedBy?: string;
  receipNumber?: string;
  projectID?: string;
  projectName?: string;
  entryID?: string;
  entrydate?: Date;
  ecount?: number;
  eMonth?: string;
  eYear?: string;
  taxType?: string;
  taxRate?: string;
  taxAmount?: number;
  itemname?: string;
  duedate?: Date;
  supplierNr?: string;
  portions?: number;
  productID?: string;
  accountName?: string;
  session?: Date;
  transactionID?: string;
  branchcode?: string;
  subcategory?: string;
  tradingCurrency?: string;
  tcValue?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ExpensesTable {
  refNo: number;
  accountNr?: string;
  accountType?: string;
  accountName?: string;
  typeOfExpenses?: string;
  description?: string;
  category?: string;
  receipNumber?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface IncomesCreation {
  refNo: number;
  accountName?: string;
  typeOfIncome?: string;
  description?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ==================== ADDITIONAL MODELS ====================

export interface BillSundryMaster {
  s_no: number;
  accountName?: string;
  accountNr?: string;
  group_Name?: string;
  bl_type?: string;
  class?: string;
  rate?: number;
  taxableRate?: number;
  taxedAmountRate?: number;
  nature?: string;
  entrydate?: string;
  entryID?: string;
  comment?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface CashBankTransfers {
  refNo: number;
  accountName?: string;
  typeOfTransfer?: string;
  description?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ComPorts {
  refno: number;
  name?: string;
  comPort?: string;
  baudRate?: number;
  line1Description?: string;
  line2Description?: string;
  line2NoEntryDescription?: string;
  line2ChangeDescription?: string;
  organisationName?: string;
  branchcode?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface Depat {
  serial: number;
  department?: string;
  comment?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface DeptsTill {
  refno: number;
  department_Till?: string;
  description?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ExpiryAnalysis {
  refno: number;
  productName?: string;
  qty?: number;
  expiryDate?: Date;
  batch?: string;
  status?: string;
  department?: string;
  dateModified?: Date;
  action?: string;
  remark?: string;
  staffId?: string;
  managerId?: string;
  entryDate?: Date;
  entryID?: string;
  entryTime?: string;
  modDate?: Date;
  timeMod?: string;
  modID?: string;
  store?: string;
  actionOrdered?: string;
  actionTaken?: string;
  actionTakenDate?: Date;
  actionTakenTime?: string;
  actionTakenby?: string;
  actionOrderedBy?: string;
  actionOrderedDate?: Date;
  actionOrderedTime?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface FinancialYear {
  refno: number;
  year?: number;
  satus?: string;
  startDate?: Date;
  enddate?: Date;
  deleted?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface OnDuty {
  refno: number;
  session?: Date;
  department?: string;
  userName?: string;
  barcodenr?: string;
  manager?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface RegionState {
  refno: number;
  region_State?: string;
  city_Town?: string;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface SessionCreation {
  refno: number;
  session?: Date;
  startTime?: string;
  state?: string;
  cDate?: Date;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface VehicleRegTbl {
  refNo: number;
  vin?: string;
  plateNumber?: string;
  make?: string;
  model?: string;
  year?: number;
  insuranceNumber?: string;
  insuranceExpiryDate?: Date;
  roadworthyNumber?: string;
  roadworthyExpiryDate?: Date;
  weight?: number;
  capacity?: number;
  vehicleState?: string;
  remarks?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface ProformaTbl {
  refNo: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  batchNo?: string;
  hi_Unitprice?: number;
  unitPrice?: number;
  quantity?: number;
  cost?: number;
  discount?: number;
  extendedPrice?: number;
  entryID?: string;
  customerID?: string;
  customerName?: string;
  customerAddress?: string;
  customerContact?: string;
  entryDate?: Date;
  remarks?: string;
  prevStock?: number;
  prevReorder?: number;
  costPrice?: number;
  profitOrLoss?: number;
  amountpaid?: number;
  change_Balance?: number;
  tax?: number;
  attendant?: string;
  tillName?: string;
  time?: string;
  session?: string;
  barcodenr?: string;
  amountInwords?: string;
  previous_Balance?: number;
  current_Balance?: number;
  currency?: string;
  description?: string;
  companyNo?: string;
  status?: string;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface SalesReturnMaster {
  refNo: number;
  invoiceNr?: string;
  productID?: string;
  productName?: string;
  unitPrice?: number;
  quantity?: number;
  cost?: number;
  discount?: number;
  tax_Rate?: number;
  extendedPrice?: number;
  status?: string;
  entryDate?: Date;
  taxName?: string;
  taxtype?: string;
  entryID?: string;
  accountNr?: string;
  customerName?: string;
  remarks?: string;
  prevStock?: number;
  prevReorder?: number;
  costPrice?: number;
  profitOrLoss?: number;
  sales_type?: string;
  purchasedate?: Date;
  salesrepid?: string;
  reason?: string;
  actiontaken?: string;
  store?: string;
  branchCode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

export interface MilkingTbl {
  refNo: number;
  salesPerson_ID?: string;
  post?: string;
  session?: Date;
  description?: string;
  note1_QTY?: number;
  note1_Amt?: number;
  note2_QTY?: number;
  note2_Amt?: number;
  note3_QTY?: number;
  note3_Amt?: number;
  note4_QTY?: number;
  note4_Amt?: number;
  note5_QTY?: number;
  note5_Amt?: number;
  note6_QTY?: number;
  note6_Amt?: number;
  note7_QTY?: number;
  note7_Amt?: number;
  note8__QTY?: number;
  note8_Amt?: number;
  coin_QTY1?: number;
  coin_Amt1?: number;
  coin_QTY2?: number;
  coin_Amt2?: number;
  coin_QTY3?: number;
  coin_Amt3?: number;
  coin_QTY4?: number;
  coin_Amt4?: number;
  coin_QTY5?: number;
  coin_Amt5?: number;
  coin_QTY6?: number;
  coin_Amt6?: number;
  coin_QTY7?: number;
  coin_Amt7?: number;
  coin_QTY8?: number;
  coin_Amt8?: number;
  total_Notes?: number;
  total_Coins?: number;
  grand_Total?: number;
  issuedBy_ID_ReceivedBy_ID?: string;
  note_Symbol?: string;
  coin_Symbol?: string;
  purpose?: string;
  receipient?: string;
  time?: string;
  branchcode?: string;
  organisationName?: string;
  organisationCode?: string;
  branchName?: string;
}

// ====================================
// RETAIL SALES - GIFT CARD TRACKING
// ====================================
export interface SalesDetailsGifts {
  refNo?: number;
  invoiceNr?: string;
  giftCardNumber?: string;
  giftCardBarcode?: string;
  amountRedeemed?: number;
  previousBalance?: number;
  remainingBalance?: number;
  redemptionDate?: Date;
  redemptionTime?: string;
  customerID?: string;
  customerName?: string;
  customerAccountNr?: string;
  attendantID?: string;
  attendantName?: string;
  tillName?: string;
  session?: string;
  transactionType?: string; // 'REDEMPTION' | 'ISSUE' | 'REFUND'
  giftCardStatus?: string; // 'ACTIVE' | 'USED' | 'PARTIALLY_USED'
  issuedDate?: Date;
  expiryDate?: Date;
  soldByID?: string;
  soldByName?: string;
  issuedToName?: string;
  issuedToPhone?: string;
  issuedToEmail?: string;
  paymentMethod?: string;
  referenceNumber?: string;
  notes?: string;
  verified?: boolean;
  verifiedBy?: string;
  verifiedDate?: Date;
  batchNumber?: string;
  promotionCode?: string;
  discountApplied?: number;
  taxAmount?: number;
  taxRate?: number;
  receiptNumber?: string;
  receiptPrinted?: boolean;
  receiptEmailSent?: boolean;
  receiptSmsSent?: boolean;
  organisationCode?: string;
  organisationName?: string;
  branchCode?: string;
  branchName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

// ====================================
// RETAIL SALES - RETURN TRANSACTIONS
// ====================================
export interface ReturnTransactions {
  refNo?: number;
  returnNumber?: string;
  originalInvoiceNr?: string;
  originalSaleDate?: Date;
  returnDate?: Date;
  returnTime?: string;
  returnReason?: string;
  returnType?: string; // 'FULL' | 'PARTIAL' | 'EXCHANGE'
  returnStatus?: string; // 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
  
  // Product Details
  productID?: string;
  productName?: string;
  barcode?: string;
  categoryID?: string;
  subcategory?: string;
  batchNo?: string;
  
  // Quantity & Pricing
  quantityReturned?: number;
  quantitySold?: number;
  unitPrice?: number;
  originalPrice?: number;
  returnAmount?: number;
  restockingFee?: number;
  refundAmount?: number;
  
  // Tax & Discount
  taxRate?: number;
  taxAmount?: number;
  originalDiscount?: number;
  discountAdjustment?: number;
  
  // Customer Information
  customerID?: string;
  customerName?: string;
  customerAccountNr?: string;
  customerPhone?: string;
  customerEmail?: string;
  loyaltyCardNumber?: string;
  loyaltyPointsAdjustment?: number;
  
  // Staff & Location
  processedByID?: string;
  processedByName?: string;
  approvedByID?: string;
  approvedByName?: string;
  originalAttendantID?: string;
  originalAttendantName?: string;
  tillName?: string;
  session?: string;
  
  // Refund Method
  refundMethod?: string; // 'CASH' | 'CARD' | 'STORE_CREDIT' | 'GIFT_CARD' | 'ORIGINAL_METHOD'
  refundReference?: string;
  giftCardIssued?: string;
  giftCardAmount?: number;
  storeCreditIssued?: boolean;
  storeCreditAmount?: number;
  
  // Inventory Impact
  restockRequired?: boolean;
  restockedDate?: Date;
  restockedBy?: string;
  newUnitsInStock?: number;
  previousUnitsInStock?: number;
  
  // Product Condition
  productCondition?: string; // 'NEW' | 'USED' | 'DAMAGED' | 'DEFECTIVE'
  damageNotes?: string;
  inspectionRequired?: boolean;
  inspectedBy?: string;
  inspectionDate?: Date;
  inspectionResult?: string;
  
  // Financial Tracking
  costPrice?: number;
  profitLossImpact?: number;
  accountType?: string;
  ledgerPosted?: boolean;
  ledgerPostDate?: Date;
  ledgerReference?: string;
  
  // Documentation
  receiptNumber?: string;
  receiptPrinted?: boolean;
  notes?: string;
  internalNotes?: string;
  attachments?: string;
  signature?: string;
  
  // Multi-Tenant
  organisationCode?: string;
  organisationName?: string;
  branchCode?: string;
  branchName?: string;
  
  // Audit Trail
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  isDeleted?: boolean;
}
