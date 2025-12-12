// ============================================================================
// PowerTrader Database Models - All Entity Interfaces
// Generated: December 12, 2025
// Complete SQL Server Schema Migration - Part 1
// ============================================================================

export interface users_tbl {
  id?: number;
  staffID?: string;
  username?: string;
  password?: string;
  ulevel?: number;
  isActive?: boolean;
  dateCreated?: Date;
  dateModified?: Date;
  organisationId?: number;
  branchId?: number;
}

export interface Account_Group_Master {
  Under?: number;
  PrimaryGroup?: string;
  Account_Type?: string;
  Group_Name?: string;
  Nature?: string;
  Comments?: string;
  Superid?: number;
  AccountStatus?: string;
  IS_Status?: string;
  BS_Status?: string;
  CF_Status?: string;
  RE_Status?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Account_Creation {
  S_No?: number;
  AccountGroup?: string;
  AccountName?: string;
  accountnr?: string;
  ContactPerson?: string;
  physical_address?: string;
  postal_address?: string;
  phone?: string;
  fax?: string;
  e_mail?: string;
  dated?: Date;
  Status?: string;
  Opening_Balance?: number;
  OBNature?: string;
  Credit_limit?: number;
  Comments?: string;
  Super_Group?: string;
  Under?: string;
  Closing_Balance?: number;
  CBnature?: string;
  BranchId?: string;
  entryid?: string;
  entrydate?: string;
}

export interface Account_Ledger_tbl {
  Refno?: number;
  TransDate?: Date;
  Department?: string;
  VoucherType?: string;
  AccountNr?: string;
  AccountName?: string;
  Debit?: number;
  Credit?: number;
  Balance?: number;
  AccountingStatus?: string;
  Nature?: string;
  Narration?: string;
  VoucherNr?: string;
  AccountGroup?: string;
  EntryID?: string;
  Month?: string;
  Year?: number;
  AccountType?: string;
  AccountStatus?: string;
  Description?: string;
  EntryDate?: Date;
  Time?: string;
  IS_Status?: string;
  BS_Status?: string;
  CF_Status?: string;
  RE_Status?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Accounts_Creation {
  Refno?: number;
  AccountGroup?: string;
  AccountName?: string;
  AccountNr?: string;
  OpeningBalance?: number;
  Nature?: string;
  CreditLimit?: number;
  Narration?: string;
  EntryID?: string;
  EntryDate?: string;
  TIN?: string;
  AccountType?: string;
  AccountStatus?: string;
  IS_Status?: string;
  BS_Status?: string;
  CF_Status?: string;
  RE_Status?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface ATC_tbl {
  RefNo?: number;
  ATCNumber?: string;
  DateCreated?: Date;
  TimeCreated?: string;
  CreatedByID?: string;
  DateModified?: Date;
  TimeModified?: string;
  ModifiedByID?: string;
  Organization?: string;
  ContactPerson?: string;
  DeliveryAddress?: string;
  PhoneNumber?: string;
  DriversID?: string;
  DriversName?: string;
  DriversContact?: string;
  DriverAssistantName?: string;
  DriverAssistantID?: string;
  DriverAssistantContact?: string;
  DigitalAddress?: string;
  PlateNumber?: string;
  VehicleOwnersNumber?: string;
  InsuranceExpiryDate?: Date;
  RoadworthyExpiryDate?: Date;
  InvoiceNr?: string;
  FleetNumber?: string;
  FleetSection?: string;
  ShipToParty?: string;
  SoldToParty?: string;
  Distance?: number;
  AddictionalDistance?: number;
  TotalDistance?: number;
  LitrePerKM?: number;
  TotalFuelAllowed?: number;
  EADate?: Date;
  AADate?: Date;
  ETATime?: string;
  ATATime?: string;
  ConfirmationOfReceipt?: string;
  ConfirmationContact?: string;
  ConfirmedBy?: string;
  SupplierName?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Attendance_Tbl {
  Refno?: number;
  StaffId?: string;
  Name?: string;
  Barcode?: string;
  Position?: string;
  Date?: Date;
  Login_Time?: string;
  Logout_Time?: string;
  Logged?: string;
  Logout_Date?: string;
  MinToLate?: string;
  Month?: string;
  Year?: string;
  Post?: string;
  FPTemplate?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface AuditT {
  RefNo?: number;
  EntryDate?: Date;
  Date1?: Date;
  Date2?: Date;
  Report?: string;
  EntryID?: string;
  Ecount?: number;
  Narration?: string;
  DateEnded?: string;
  Time?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Bank_Accounts {
  RefNo?: number;
  BankName?: string;
  BankBranch?: string;
  AccountName?: string;
  AccounTNumber?: string;
  AccountType?: string;
  Currency?: string;
  Remarks?: string;
  EntryID?: string;
  EntryDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Bill_Sundry_Master {
  S_no?: number;
  AccountName?: string;
  AccountNr?: string;
  Group_Name?: string;
  BL_type?: string;
  Class?: string;
  Rate?: number;
  TaxableRate?: number;
  TaxedAmountRate?: number;
  Nature?: string;
  Entrydate?: string;
  EntryID?: string;
  comment?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Branches {
  RefNo?: number;
  OrganisationName?: string;
  BranchName?: string;
  PostalAddress?: string;
  PhysicalLocation?: string;
  City?: string;
  RegionOrState?: string;
  Country?: string;
  OfficePhone?: string;
  CellPhone?: string;
  Fax?: string;
  Email?: string;
  Website?: string;
  Remarks?: string;
  TIN?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Cash_Bank_Transfers {
  RefNo?: number;
  AccountName?: string;
  TypeOfTransfer?: string;
  Description?: string;
  BranchId?: string;
  OrganisationId?: string;
}

export interface Cash_Sales_Pending {
  refno?: number;
  invoicenr?: string;
  ProductID?: string;
  ProductName?: string;
  UnitPrice?: number;
  Quantity?: number;
  cost?: number;
  discount?: number;
  tax?: number;
  extendedprice?: number;
  entryid?: string;
  CustomerAccountNr?: string;
  CustomerID?: string;
  CustomerName?: string;
  entrydate?: Date;
  prevstock?: number;
  prevreorder?: number;
  ProfitOrLoss?: number;
  CostPrice?: number;
  Wholesalesprice?: number;
  AccountType?: string;
  HI_UnitPrice?: number;
  BatchNo?: string;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: string;
  Barcodenr?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  Store?: string;
  SellingUnit?: string;
  Volume?: string;
  ItemType?: string;
  description?: string;
  ViewState?: string;
  TaxType?: string;
  Tax1Rate?: number;
  Tax1Amount?: number;
  Tax2Rate?: number;
  Tax2Amount?: number;
  Tax3Rate?: number;
  Tax3Amount?: number;
  Tax4Rate?: number;
  Tax4Amount?: number;
  TaxRate?: number;
  Taxable?: number;
  SupplierID?: string;
  LoyaltyPoints?: number;
  LoyaltyCarNumber?: string;
  CategoryID?: string;
  Max_Stock?: number;
  Subcategory?: string;
  CustomerDetails?: string;
  QtyPerUnit?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Categories {
  CategoryID?: number;
  CategoryName?: string;
  Description?: string;
  buttoncolor?: string;
  fontsize?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Cheque_Transaction {
  Refno?: number;
  VoucherType?: string;
  VoucherNumber?: string;
  BankAccountNr?: string;
  AccountName?: string;
  BankName?: string;
  Branch?: string;
  AccountType?: string;
  ChequeNumber?: string;
  ChequeDate?: Date;
  ChequeClearingDate?: Date;
  Paid_ReceicedBy?: string;
  ClearingDays?: number;
  AuthorizedBy?: string;
  Amount?: number;
  Status?: string;
  StatusUpdatedDate?: Date;
  ReturnedCharges?: number;
  EntryID?: string;
  EntryDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface ComPorts {
  Refno?: number;
  Name?: string;
  ComPort?: string;
  BaudRate?: number;
  Line1Description?: string;
  Line2Description?: string;
  Line2NoEntryDescription?: string;
  Line2ChangeDescription?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface countries {
  id?: number;
  country_name?: string;
  country_code?: string;
  currency_name?: string;
  currency_code?: string;
  currency_symbol?: string;
  note_name?: string;
  coin_name?: string;
}

export interface Credit_Wholesale {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  Tax_Rate?: number;
  ExtendedPrice?: number;
  Status?: string;
  EntryDate?: Date;
  TaxName?: string;
  taxtype?: string;
  EntryID?: string;
  AccountNr?: string;
  CustomerName?: string;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  sales_type?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface cus_barcode_index {
  Refno?: number;
  CBindex?: number;
  BranchId?: string;
  OrganisationId?: string;
}

export interface Customer_Sales_Order {
  Refno?: number;
  invoicenr?: string;
  ProductID?: string;
  ProductName?: string;
  UnitPrice?: number;
  Quantity?: number;
  QtySold?: number;
  Cost?: number;
  Discount?: number;
  Tax?: number;
  ExtendedPrice?: number;
  CustomerID?: string;
  CustomerName?: string;
  CustomerAddress?: string;
  CustomerContact?: string;
  EntryID?: string;
  EntryDate?: Date;
  Originalqty?: number;
  Remarks?: string;
  BatchNo?: string;
  AmountPaid?: number;
  Change_Balance?: number;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: string;
  Barcodenr?: string;
  SalesType?: string;
  BarcodeImage?: any;
  AmountInWords?: string;
  Status?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Depat {
  serial?: number;
  Department?: string;
  Comment?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Depts_Till {
  Refno?: number;
  Department_Till?: string;
  Description?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface DutyRoaster {
  Refno?: number;
  StaffID?: string;
  Name?: string;
  Designation?: string;
  Day1?: string;
  Day1_Time?: string;
  Day2?: string;
  Day2_Time?: string;
  Day3?: string;
  Day3_Time?: string;
  Day4?: string;
  Day4_Time?: string;
  Day5?: string;
  Day5_Time?: string;
  Day6?: string;
  Day6_Time?: string;
  Day7?: string;
  Day7_Time?: string;
  MinToLate?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Expenses_Expenditure {
  RefNo?: number;
  TransDate?: Date;
  Chcode?: string;
  Department?: string;
  Groups_Service?: string;
  TypeOfExpenses?: string;
  DescriptionOrProducts?: string;
  UnitPrice?: number;
  Quantity?: number;
  Amount?: number;
  IssuedID?: string;
  ReceivedBy?: string;
  ReceipNumber?: string;
  ProjectID?: string;
  ProjectName?: string;
  EntryID?: string;
  Entrydate?: Date;
  Ecount?: number;
  EMonth?: string;
  EYear?: string;
  TaxType?: string;
  TaxRate?: string;
  TaxAmount?: number;
  itemname?: string;
  Duedate?: Date;
  supplierNr?: string;
  portions?: number;
  ProductID?: string;
  AccountName?: string;
  Session?: Date;
  TransactionID?: string;
  subcategory?: string;
  TradingCurrency?: string;
  TCValue?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface expenses_table {
  RefNo?: number;
  AccountNr?: string;
  AccountType?: string;
  AccountName?: string;
  TypeOfExpenses?: string;
  Description?: string;
  Category?: string;
  ReceipNumber?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Expiry_Analysis {
  Refno?: number;
  ProductName?: string;
  Qty?: number;
  ExpiryDate?: Date;
  Batch?: string;
  Status?: string;
  Department?: string;
  DateModified?: Date;
  Action?: string;
  Remark?: string;
  StaffId?: string;
  ManagerId?: string;
  EntryDate?: Date;
  EntryID?: string;
  EntryTime?: string;
  ModDate?: Date;
  TimeMod?: string;
  ModID?: string;
  Store?: string;
  ActionOrdered?: string;
  ActionTaken?: string;
  ActionTakenDate?: Date;
  ActionTakenTime?: string;
  ActionTakenby?: string;
  ActionOrderedBy?: string;
  ActionOrderedDate?: Date;
  ActionOrderedTime?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Financial_Year {
  Refno?: number;
  Year?: number;
  Satus?: string;
  StartDate?: Date;
  Enddate?: Date;
  Deleted?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Gift_Card_tbl {
  Refno?: number;
  AccountNr?: string;
  AccountName?: string;
  Vouchertype?: string;
  VoucherNumber?: string;
  CardName?: string;
  BarcodeNr?: string;
  Barcodeimage?: any;
  CardValue?: number;
  ExpiryDate?: Date;
  Number?: string;
  Status?: string;
  EntryID?: string;
  EntryDate?: Date;
  SoldByID?: string;
  SoldDate?: Date;
  SoldTime?: string;
  UsedDate?: Date;
  UsedTime?: string;
  UserID?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Health_Insurance_Claimed_Drugs {
  refno?: number;
  DateOfServiceProvision?: string;
  InvoiceNr?: string;
  ProductID?: string;
  MedicineName?: string;
  HI_UnitPrice?: number;
  Qunatity?: number;
  Debit?: number;
  HI_Number?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Health_Insurance_Claims {
  Refno?: number;
  Insurance_Type?: string;
  InsuranceCode?: string;
  NameOfScheme?: string;
  ClaimNumber?: string;
  ClaimDate?: string;
  HI_Number?: string;
  Surname?: string;
  OtherNames?: string;
  Gender?: string;
  DateOfBirth?: string;
  Age?: string;
  HospitalRecordNr?: string;
  TypeOfService?: string;
  DateOfServiceProvision?: string;
  BarcodeNr?: string;
  G_DRG?: string;
  InvoiceNr?: string;
  Debit?: number;
  Credit?: number;
  Balance?: number;
  EntryID?: string;
  EntryDay?: string;
  Month?: string;
  Year?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Health_Insurance_schemes {
  Refno?: number;
  Insurance_Type?: string;
  ClaimNumber?: string;
  NameOfScheme?: string;
  Description?: string;
  logo?: any;
  signature?: any;
  InsuranceOfficer?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Incomes_Creation {
  RefNo?: number;
  AccountName?: string;
  TypeOfIncome?: string;
  Description?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Insurance_Sales_Pending {
  refno?: number;
  invoicenr?: string;
  InsuranceCode?: string;
  Insurance_Type?: string;
  NameOfScheme?: string;
  ClaimNumber?: string;
  ClaimDate?: Date;
  HI_Number?: string;
  Surname?: string;
  OtherNames?: string;
  Gender?: string;
  DateOfBirth?: string;
  Age?: number;
  HospitalRecordNr?: string;
  TypeOfService?: string;
  DateOfServiceProvision?: string;
  G_DRG?: string;
  entryid?: string;
  entrydate?: Date;
  BarcodeNr?: string;
  TillName?: string;
  quantityt?: string;
  Time?: string;
  HI_unitprice?: number;
  discount?: number;
  cost?: number;
  tax?: number;
  extendedprice?: number;
  costprice?: number;
  profitorlost?: number;
  wholesaleprice?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Invoice_Credit_wholesales {
  RefNo?: number;
  InvoiceNr?: string;
  UnitPrice?: number;
  Cost?: number;
  Discount?: number;
  Tax?: number;
  ExtendedPrice?: number;
  AmtPaid?: number;
  Balance?: number;
  EntryID?: string;
  AccountNr?: string;
  CustomerName?: string;
  customerAddress?: string;
  City?: string;
  Region?: string;
  Country?: string;
  OrderID?: number;
  OrderDate?: Date;
  RequiredDate?: Date;
  ShippedDate?: Date;
  DelievryName?: string;
  DelievryAddress?: string;
  DelievryCity?: string;
  DeliveryRegion?: string;
  DeliveryCountry?: string;
  DeliveryContactNe?: string;
  EntryDate?: Date;
  remarks?: string;
  CostPrice?: number;
  ProfitOrLost?: number;
  WholesalePrice?: number;
  WholeSaleDicount?: number;
  TransMonth?: string;
  TransYear?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Invoices {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  VATNHIL?: number;
  ExtendedPrice?: number;
  AmtPaid?: number;
  Balance?: number;
  EntryID?: string;
  CustomerID?: string;
  CustomerName?: string;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  OrderID?: number;
  OrderDate?: Date;
  RequiredDate?: Date;
  ShippedDate?: Date;
  ShipperName?: string;
  Freight?: number;
  DelievryName?: string;
  DelievryAddress?: string;
  DelievryCity?: string;
  DeliveryRegion?: string;
  DeliveryCountry?: string;
  DeliveryContactNe?: string;
  EntryDate?: Date;
  remarks?: string;
  CostPrice?: number;
  ProfitOrLost?: number;
  WholesalePrice?: number;
  WholeSaleDicount?: number;
  TransMonth?: string;
  TransYear?: number;
  AmountInwords?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  Store?: string;
  PatientID?: string;
  SalesRep?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Invoices_Temp {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  VATNHIL?: number;
  ExtendedPrice?: number;
  AmtPaid?: number;
  Balance?: number;
  EntryID?: string;
  CustomerID?: string;
  CustomerName?: string;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  OrderID?: number;
  OrderDate?: Date;
  RequiredDate?: Date;
  ShippedDate?: Date;
  ShipperName?: string;
  Freight?: number;
  DelievryName?: string;
  DelievryAddress?: string;
  DelievryCity?: string;
  DeliveryRegion?: string;
  DeliveryCountry?: string;
  DeliveryContactNe?: string;
  EntryDate?: Date;
  remarks?: string;
  CostPrice?: number;
  ProfitOrLost?: number;
  WholesalePrice?: number;
  WholeSaleDicount?: number;
  TransMonth?: string;
  TransYear?: number;
  AmountInwords?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  Store?: string;
  PatientID?: string;
  SalesRep?: string;
  LoyaltyCardNumber?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Milking_Tbl {
  RefNo?: number;
  SalesPerson_ID?: string;
  Post?: string;
  Session?: Date;
  Description?: string;
  Note1_QTY?: number;
  Note1_Amt?: number;
  Note2_QTY?: number;
  Note2_Amt?: number;
  Note3_QTY?: number;
  Note3_Amt?: number;
  Note4_QTY?: number;
  Note4_Amt?: number;
  Note5_QTY?: number;
  Note5_Amt?: number;
  Note6_QTY?: number;
  Note6_Amt?: number;
  Note7_QTY?: number;
  Note7_Amt?: number;
  Note8__QTY?: number;
  Note8_Amt?: number;
  Coin_QTY1?: number;
  Coin_Amt1?: number;
  Coin_QTY2?: number;
  Coin_Amt2?: number;
  Coin_QTY3?: number;
  Coin_Amt3?: number;
  Coin_QTY4?: number;
  Coin_Amt4?: number;
  Coin_QTY5?: number;
  Coin_Amt5?: number;
  Coin_QTY6?: number;
  Coin_Amt6?: number;
  Coin_QTY7?: number;
  Coin_Amt7?: number;
  Coin_QTY8?: number;
  Coin_Amt8?: number;
  Total_Notes?: number;
  Total_Coins?: number;
  Grand_Total?: number;
  IssuedBy_ID_ReceivedBy_ID?: string;
  Note_Symbol?: string;
  Coin_Symbol?: string;
  Purpose?: string;
  Receipient?: string;
  Time?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface OnDuty {
  Refno?: number;
  Session?: Date;
  Department?: string;
  UserName?: string;
  Barcodenr?: string;
  Manager?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Open_Balance_tbl {
  Refno?: number;
  Date?: Date;
  AccountNr?: string;
  AccountType?: string;
  AccountName?: string;
  Debit?: number;
  Credit?: number;
  Narrations?: string;
  EntryID?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Order_Reversed_tbl {
  Refno?: number;
  invoicenr?: string;
  ProductID?: string;
  ProductName?: string;
  Quantity?: string;
  TillName?: string;
  Session?: Date;
  Time?: string;
  SellingUnit?: string;
  Attendant?: string;
  Supervisor?: string;
  Ordered?: string;
  Reason?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Orders_Tbl {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  Qty_Ordered?: number;
  Qty_Supplied?: number;
  EntryID?: string;
  CustomerID?: string;
  customername?: string;
  EntryDate?: Date;
  TillName?: string;
  Time?: string;
  Session?: string;
  Status?: string;
  Remarks?: string;
  SupplierID?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Organisation_Information {
  RefNo?: number;
  PostalAddress?: string;
  PhysicalLocation?: string;
  City?: string;
  RegionOrState?: string;
  Country?: string;
  OfficePhone?: string;
  CellPhone?: string;
  Fax?: string;
  Email?: string;
  Website?: string;
  Logo?: any;
  Remarks?: string;
  TIN?: string;
  ReceiptNote?: any;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Other_Stores_Items {
  Refno?: number;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  Manufacturer?: string;
  SupplierID?: string;
  CategoryID?: string;
  Subcategory?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Wholesalesprice?: number;
  HI_Unitprice?: number;
  DiscountPercentage?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: string;
  EntryID?: string;
  CostPrice?: number;
  ProfitorLoss?: number;
  barcodenr?: string;
  tax_rate?: string;
  itemlocation?: string;
  Photo?: any;
  EntryDate?: Date;
  ExpiryDate?: Date;
  originalunitprice?: number;
  SellingUnit?: string;
  QtyPerPortion?: number;
  Max_Stock?: number;
  Store?: string;
  ProductRating?: number;
  Countryoforigin?: string;
  RetailUnitInPacks?: number;
  RetailSellingUnit?: string;
  AllowCustomPricing?: string;
  RetailStockUnit?: number;
  Shotprice?: number;
  ShotMeasure?: number;
  LastReportStockDate?: Date;
  QtyInCarton?: number;
  CartonUnit?: string;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface PaymentVoucher {
  Refno?: number;
  VoucherNumber?: string;
  Paid_To?: string;
  Address?: string;
  Contacts?: string;
  Amount?: number;
  Description?: string;
  DebitAccountName?: string;
  DebitAccountNumber?: string;
  Department?: string;
  AuthorizeddBy?: string;
  CreditAccountName?: string;
  CreditAccountnumber?: string;
  BankAccountNr?: string;
  BankAccountName?: string;
  ChequeNumber?: string;
  ChequeDate?: string;
  ClearingDays?: string;
  EntryID?: string;
  EntryDate?: Date;
  Balance?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Products {
  Refno?: number;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  Manufacturer?: string;
  SupplierID?: string;
  CategoryID?: string;
  Subcategory?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Wholesalesprice?: number;
  HI_Unitprice?: number;
  DiscountPercentage?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: string;
  EntryID?: string;
  CostPrice?: number;
  ProfitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  Photo?: any;
  EntryDate?: Date;
  ExpiryDate?: Date;
  originalunitprice?: number;
  SellingUnit?: string;
  Max_Stock?: number;
  Countryoforigin?: string;
  RetailUnitInPacks?: number;
  QtyInCarton?: number;
  CartonUnit?: string;
  QtyPerPortion?: number;
  RetailSellingUnit?: string;
  Store?: string;
  AllowCustomPricing?: string;
  RetailStockUnit?: number;
  Shotprice?: number;
  ProductRating?: string;
  PortionCost?: number;
  PortionProfit?: number;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Proforma_Tbl {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  ExtendedPrice?: number;
  EntryID?: string;
  CustomerID?: string;
  CustomerName?: string;
  CustomerAddress?: string;
  CustomerContact?: string;
  EntryDate?: Date;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  Amountpaid?: number;
  Change_Balance?: number;
  Tax?: number;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: string;
  Barcodenr?: string;
  AmountInwords?: string;
  Previous_Balance?: number;
  Current_Balance?: number;
  Currency?: string;
  Description?: string;
  CompanyNo?: string;
  Status?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Purchase_Order_tbl {
  Refno?: number;
  OrderID?: string;
  Supplier?: string;
  ProductName?: string;
  SellingUnit?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Quantity?: number;
  Amount?: number;
  ExpectedDeliveryDate?: Date;
  DateAdded?: Date;
  TimeAdded?: string;
  EntryID?: string;
  DateModified?: Date;
  TimeModified?: string;
  ModifiedID?: string;
  Barcodenr?: string;
  BarcodeImage?: any;
  AuthorizedBy?: string;
  LastPurchasedQty?: number;
  LastPurchasedDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Purchase_Return_master {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  Tax_Rate?: number;
  ExtendedPrice?: number;
  Status?: string;
  EntryDate?: Date;
  TaxName?: string;
  taxtype?: string;
  EntryID?: string;
  AccountNr?: string;
  CustomerName?: string;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  sales_type?: string;
  TradingCurrency?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Purchase_Return_Tax {
  S_no?: number;
  Tax_Name?: string;
  Rate?: number;
  Percentage?: string;
  Nature?: string;
  Amt?: number;
  ByRate?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Purchases_Invoice_master {
  RefNo?: number;
  ProductID?: string;
  ProductName?: string;
  Manufacturer?: string;
  InvoiceNr?: string;
  InvoiceDate?: string;
  ExpiryDate?: string;
  SupplierID?: string;
  CategoryID?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Wholesaleprice?: number;
  DiscountPercentage?: number;
  Quantity?: number;
  EntryID?: string;
  EntryDate?: Date;
  CostPricePerUnit?: number;
  month?: string;
  year?: string;
  Status?: string;
  ConfirmBy?: string;
  ConfirmRemarks?: string;
  itemname?: string;
  SupplierName?: string;
  Discount?: number;
  TaxName?: string;
  Tax_Amount?: number;
  Description?: string;
  Amount?: number;
  ReceiptNumber?: string;
  ReceivedBy?: string;
  Portions?: number;
  BatchNo?: string;
  TradingCurrency?: string;
  TCValue?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface ReceiptPrintingSetup {
  refno?: number;
  Name?: string;
  Type?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface ReceiptVoucher {
  Refno?: number;
  ReceiptType?: string;
  VoucherNumber?: string;
  ReceivedFrom?: string;
  Address?: string;
  Contacts?: string;
  Amount?: number;
  Description?: string;
  Department?: string;
  CreditAccountName?: string;
  CreditAccountnumber?: string;
  CreditBankAccountNr?: string;
  CreditBankName?: string;
  CreditChequeNumber?: string;
  CreditChequeClearingDate?: string;
  CrClearDays?: string;
  DebitAccountName?: string;
  DebitAccountNumber?: string;
  DebitBankAccountNr?: string;
  DebitBankName?: string;
  ChequeNumber?: string;
  ChequeDate?: string;
  ClearingDays?: string;
  AuthorizeddBy?: string;
  EntryID?: string;
  EntryDate?: Date;
  Balance?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Region_State {
  refno?: number;
  Region_State?: string;
  City_Town?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Retail_Items {
  Refno?: number;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  Manufacturer?: string;
  SupplierID?: string;
  CategoryID?: string;
  Subcategory?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Wholesalesprice?: number;
  HI_Unitprice?: number;
  DiscountPercentage?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: string;
  EntryID?: string;
  CostPrice?: number;
  ProfitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  Photo?: any;
  EntryDate?: Date;
  ExpiryDate?: Date;
  originalunitprice?: number;
  SellingUnit?: string;
  QtyPerPortion?: number;
  Max_Stock?: number;
  Store?: string;
  ProductRating?: number;
  Countryoforigin?: string;
  RetailUnitInPacks?: number;
  AllowCustomPricing?: string;
  RetailStockUnit?: number;
  Shotprice?: number;
  ShotMeasure?: number;
  LastReportStockDate?: Date;
  QtyInCarton?: number;
  CartonUnit?: string;
  RetailSellingUnit?: string;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Sales_Details {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  ExtendedPrice?: number;
  EntryID?: string;
  CustomerID?: string;
  CustomerName?: string;
  EntryDate?: Date;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  Amountpaid?: number;
  Change_Balance?: number;
  Tax?: number;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: Date;
  Barcodenr?: string;
  SalesType?: string;
  AmountInwords?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  qtyremaining?: number;
  qtyreturned?: number;
  Previous_Balance?: number;
  Current_Balance?: number;
  Currency?: string;
  Description?: string;
  Store?: string;
  PatientID?: string;
  SalesRep?: string;
  TaxType?: string;
  Tax1Rate?: number;
  Tax1Amount?: number;
  Tax2Rate?: number;
  Tax2Amount?: number;
  Tax3Rate?: number;
  Tax3Amount?: number;
  Tax4Rate?: number;
  Tax4Amount?: number;
  TaxRate?: number;
  Taxable?: number;
  SupplierID?: string;
  LoyaltyPoints?: number;
  LoyaltyCardNumber?: string;
  LoyaltyPointsRedeemed?: number;
  LoyaltyAmountRedeemed?: number;
  DiscountType?: string;
  CustomerAccountNr?: string;
  ItemType?: string;
  SellingUnit?: string;
  Volume?: string;
  CategoryID?: string;
  Max_Stock?: number;
  Month?: string;
  MonthYear?: string;
  Subcategory?: string;
  Year?: number;
  CustomerDetails?: string;
  StaffID?: string;
  FirstName?: string;
  LastName?: string;
  Day?: string;
  TCValue?: number;
  TradingCurrency?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Sales_Details_Gifts {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  ExtendedPrice?: number;
  EntryID?: string;
  CustomerAccountNr?: string;
  CustomerID?: string;
  CustomerName?: string;
  EntryDate?: Date;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  Amountpaid?: number;
  Change_Balance?: number;
  Tax?: number;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: string;
  Barcodenr?: string;
  SalesType?: string;
  AmountInwords?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  qtyremaining?: number;
  qtyreturned?: number;
  Previous_Balance?: number;
  Current_Balance?: number;
  Currency?: string;
  Description?: string;
  jobcardfee?: number;
  Store?: string;
  SellingUnit?: string;
  Volume?: string;
  ItemType?: string;
  PatientID?: string;
  SalesRep?: string;
  TaxType?: string;
  Tax1Rate?: number;
  Tax1Amount?: number;
  Tax2Rate?: number;
  Tax2Amount?: number;
  Tax3Rate?: number;
  Tax3Amount?: number;
  Tax4Rate?: number;
  Tax4Amount?: number;
  TaxRate?: number;
  Taxable?: number;
  SupplierID?: string;
  LoyaltyPoints?: number;
  LoyaltyCardNumber?: string;
  LoyaltyPointsRedeemed?: number;
  LoyaltyAmountRedeemed?: number;
  DiscountType?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Sales_Details_Temp {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  HI_Unitprice?: number;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  ExtendedPrice?: number;
  EntryID?: string;
  CustomerID?: string;
  CustomerName?: string;
  EntryDate?: Date;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  Amountpaid?: number;
  Change_Balance?: number;
  Tax?: number;
  Attendant?: string;
  TillName?: string;
  Time?: string;
  Session?: string;
  Barcodenr?: string;
  SalesType?: string;
  AmountInwords?: string;
  Barcodeimage?: any;
  Ordernr?: string;
  qtyremaining?: number;
  qtyreturned?: number;
  Previous_Balance?: number;
  Current_Balance?: number;
  Currency?: string;
  Description?: string;
  jobcardfee?: number;
  Store?: string;
  PatientID?: string;
  SalesRep?: string;
  TaxType?: string;
  Tax1Rate?: number;
  Tax1Amount?: number;
  Tax2Rate?: number;
  Tax2Amount?: number;
  Tax3Rate?: number;
  Tax3Amount?: number;
  Tax4Rate?: number;
  Tax4Amount?: number;
  TaxRate?: number;
  Taxable?: number;
  SupplierID?: string;
  LoyaltyPoints?: number;
  LoyaltyCardNumber?: string;
  LoyaltyPointsRedeemed?: number;
  LoyaltyAmountRedeemed?: number;
  DiscountType?: string;
  CustomerAccountNr?: string;
  ItemType?: string;
  SellingUnit?: string;
  Volume?: string;
  CategoryID?: string;
  Max_Stock?: number;
  Month?: string;
  MonthYear?: string;
  Subcategory?: string;
  Year?: number;
  CustomerDetails?: string;
  StaffID?: string;
  FirstName?: string;
  LastName?: string;
  Day?: string;
  TCValue?: number;
  TradingCurrency?: string;
  QtyPerUnit?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Sales_Return_master {
  RefNo?: number;
  InvoiceNr?: string;
  ProductID?: string;
  ProductName?: string;
  UnitPrice?: number;
  Quantity?: number;
  Cost?: number;
  Discount?: number;
  Tax_Rate?: number;
  ExtendedPrice?: number;
  Status?: string;
  EntryDate?: Date;
  TaxName?: string;
  taxtype?: string;
  EntryID?: string;
  AccountNr?: string;
  CustomerName?: string;
  remarks?: string;
  PrevStock?: number;
  PrevReorder?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  sales_type?: string;
  purchasedate?: Date;
  salesrepid?: string;
  reason?: string;
  actiontaken?: string;
  Store?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Session_Creation {
  Refno?: number;
  Session?: Date;
  StartTime?: string;
  State?: string;
  CDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Staff_Information {
  refno?: number;
  StaffID?: string;
  Title?: string;
  Surname?: string;
  OtherNames?: string;
  Gender?: string;
  DateOfBirth?: Date;
  PlaceOfBirth?: string;
  Nationalilty?: string;
  MaritalStatus?: string;
  SpouseName?: string;
  NationalID?: string;
  SocialSecurityNumber?: string;
  StreetAddress?: string;
  City?: string;
  POBox?: string;
  TownCity?: string;
  Country?: string;
  HomePhone?: string;
  CellPhone?: string;
  Email?: string;
  SocialHomepage?: string;
  DateOfEmployment?: Date;
  Designation?: string;
  Rank?: string;
  Department?: string;
  HighestEducation?: string;
  InitutionsAttended?: string;
  ReferenceName?: string;
  Relationship?: string;
  RefContactAddress?: string;
  RefContactNumber?: string;
  Photo?: any;
  Comments?: string;
  EntryID?: string;
  EntryDate?: Date;
  Ecount?: number;
  HomeTown?: string;
  NextOfKins?: string;
  KinsContactNr?: string;
  RelationshipToKins?: string;
  KinsAddress?: string;
  StaffWorkingHours?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Stock_Master {
  Refno?: number;
  TransDate?: Date;
  VoucherNr?: string;
  ProductName?: string;
  OpeningStock?: number;
  Purchase?: number;
  PurchaseReturn?: number;
  InwardTransfer?: number;
  Inward?: number;
  Sales?: number;
  SalesReturn?: number;
  OutwardTransfer?: number;
  Outward?: number;
  Balance?: number;
  Narration?: string;
  EntryID?: string;
  BatchNo?: string;
  ExpiryDate?: string;
  UnitInStock?: number;
  newprice?: number;
  lastprice?: number;
  Store?: string;
  UnitsPerCarton?: number;
  ProductID?: string;
  Session?: Date;
  TCValue?: number;
  TradingCurrency?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Stock_Record {
  Refno?: number;
  TransDate?: Date;
  VoucherNr?: string;
  Manufacturer?: string;
  Supplier?: string;
  Invoice_ReceiptNr?: string;
  Productid?: string;
  ProductName?: string;
  Description?: string;
  Qty?: number;
  Unitprice?: number;
  Amount?: number;
  CostPrice?: number;
  ProfitOrLoss?: number;
  CurrentExpiryDate?: string;
  ReciptDate?: string;
  EntryID?: string;
  Narration?: string;
  Store?: string;
  invoicenr?: string;
  invoicedate?: Date;
  expirydate?: string;
  supplierID?: string;
  Suppliername?: string;
  CategoryID?: string;
  QuantityPerUnit?: string;
  Wholesaleprice?: number;
  Discount?: number;
  Quantity_IN?: number;
  Quantity_Out?: number;
  EntryDate?: string;
  TaxName?: string;
  Tax_Amount?: number;
  Month?: string;
  Year?: number;
  ReceiptNumber?: string;
  ReceivedBy?: string;
  PurchaseID?: string;
  portions?: number;
  PortionIn?: number;
  PortionOut?: number;
  PortionMeasure?: number;
  PortionPerUnit?: number;
  BatchNo?: string;
  Session?: Date;
  TCValue?: number;
  TradingCurrency?: string;
  voucherType?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface SubCategory {
  Refno?: number;
  Subcategory?: string;
  Description?: string;
  Category?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Suppliers {
  S_No?: number;
  SupplierID?: string;
  CompanyName?: string;
  ContactName?: string;
  ContactTitle?: string;
  PostalAddress?: string;
  City?: string;
  Region?: string;
  Physicaladdress?: string;
  Country?: string;
  Phone?: string;
  CellPhone?: string;
  Email?: string;
  Fax?: string;
  HomePage?: string;
  Website?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface systemuserpro {
  RefNo?: number;
  PK?: string;
  Dn?: number;
  Remarks?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface sysuserstartup {
  refno?: number;
  InnDate?: Date;
  Dys?: number;
  CDate?: Date;
  Status?: string;
  Remarks?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tbl_barcodes {
  refno?: number;
  barcode?: string;
  description?: string;
  barcodeimage?: any;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tbl_Customer_Info {
  Refno?: number;
  AccountName?: string;
  Surname?: string;
  Othernames?: string;
  AccountNr?: string;
  Address?: string;
  City_Town?: string;
  Region_State?: string;
  PhoneNr?: string;
  CreditLimit?: number;
  CustomerType?: string;
  Sales_Rep?: string;
  OpeningBalance?: number;
  Nature?: string;
  AccountGroup?: string;
  EntryDate?: Date;
  EntryID?: string;
  Narrations?: string;
  companyname?: string;
  DigitalAddress?: string;
  Email?: string;
  OpeningPoints?: number;
  PointsToDate?: number;
  Barcodenr?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tbl_MM {
  Refno?: number;
  name?: string;
  description?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Tbl_SeasonDiscount {
  Refno?: number;
  SeasonName?: string;
  SeasonStartDate?: Date;
  SeasonEndDate?: Date;
  SeasonDiscountRate?: number;
  SeasonAlertDate?: Date;
  Store?: string;
  SeasonPurchaseValue?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tbl_servicing {
  Refno?: number;
  Jobnumber?: string;
  customernr?: string;
  customername?: string;
  PhoneNumber?: string;
  ServiceType?: string;
  ServiceRequest?: string;
  DeviceType?: string;
  DeviceBrand?: string;
  Modelnr?: string;
  CPU?: string;
  RAM?: string;
  OS?: string;
  HDD?: string;
  IMEI?: string;
  CustomerAssest?: string;
  Diagnosis?: string;
  PartsNeeded?: string;
  FinalRemark?: string;
  Status?: string;
  JobCardFee?: number;
  JobCost?: number;
  ItemImage?: any;
  JobBarcode?: any;
  Pickupdate?: Date;
  EntryDate?: Date;
  EntryID?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tbl_Settings {
  RefNo?: number;
  CountryCode?: string;
  SmsPrefix?: string;
  Currency?: string;
  entryvoucher_ad_Image?: any;
  taxicard_ad_Image?: any;
  TaxInstruction?: any;
  RecieptAD?: any;
  Tax1Name?: string;
  Tax1Rate?: number;
  Tax2Name?: string;
  Tax2Rate?: number;
  Tax3Name?: string;
  Tax3Rate?: number;
  Tax4Name?: string;
  Tax4Rate?: number;
  VAT_Rate?: number;
  TaxType?: string;
  TaxDecimals?: number;
  ReportEmail?: string;
  AlternativeEmail?: string;
  AlternativePass?: string;
  BillItemReversing?: string;
  NegativeStock?: string;
  SMTP?: string;
  CardPayment?: string;
  ReverseUnprinted?: string;
  PrintToKitchen?: string;
  PrintToBar?: string;
  OnlinePayment?: string;
  Taxingtype?: string;
  JobcardCost?: number;
  multipayment?: string;
  jobcard?: string;
  RetailMultiPrinter?: string;
  LitrePerKM?: number;
  CharSpacing?: number;
  DisplayComport?: string;
  RetailActive?: string;
  WholesaleActive?: string;
  SearchPriority?: string;
  SyncOnline?: string;
  SMTPPort?: number;
  ForcePurchaseEntry?: string;
  PointsPerTransaction?: number;
  ValuePerPoint?: number;
  PointsToRedeem?: number;
  TaxRate1?: number;
  TaxRate2?: number;
  TaxRate3?: number;
  TaxRate4?: number;
  TaxRateCap?: number;
  ReceiptNote?: string;
  PurchasedPerPoint?: number;
  ReceiptHeader?: string;
  RedeemPointThreshold?: number;
  AuthorizeRetailPaymentPause?: string;
  POSLockTime?: number;
  POSLockAfterSale?: string;
  RetailPoint?: string;
  Wholesale1Point?: string;
  Wholesale2Point?: string;
  Milking?: string;
  portionType?: string;
  MandatoryReceipt?: string;
  PortionCategory?: string;
  HoldOrder?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface tblDaily_Assessment {
  Refno?: number;
  EntryID?: string;
  Problem?: string;
  Causes?: string;
  Status?: string;
  Solution?: string;
  Location?: string;
  Who_Reported?: string;
  Who_Resolved?: string;
  Date_Reported?: string;
  Time_Reported?: string;
  date_Resolved?: string;
  Time_Resolved?: string;
  Items_Broken?: string;
  Items_used_to_Resolve?: string;
  EntryDate?: Date;
  Department?: string;
  RequestedItems?: string;
  ProvidedItems?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Transport_Expenses {
  RefNo?: number;
  VehicleNumber?: string;
  OICName?: string;
  ItemDescription?: string;
  Cost?: number;
  Remarks?: string;
  EntryID?: string;
  EntryDate?: Date;
  Ecount?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface UploadedFile_Tbl {
  RefNo?: number;
  StaffID?: string;
  FileID?: string;
  Title?: string;
  Description?: string;
  Photo?: any;
  EntryID?: string;
  EntryDate?: Date;
  OrganisationId?: string;
  BranchId?: string;
}

export interface uSERLEVEL {
  REG?: number;
  DESIGNITION?: string;
  ULEVEL?: number;
  BranchId?: string;
  OrganisationId?: string;
}

export interface USERS {
  StaffID?: string;
  Surname?: string;
  OtherNames?: string;
  Username?: string;
  Password?: string;
  DOB?: Date;
  Designation?: string;
  Ulevel?: number;
  Barcodenr?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Vehicle_Records {
  VEhicleNo?: string;
  Make?: string;
  Model?: string;
  YearOfMake?: string;
  Type?: string;
  Air_Con?: string;
  Transamission?: string;
  OtherInofrmation?: string;
  seat?: string;
  Ecount?: number;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Vehicle_Reg_Tbl {
  RefNo?: number;
  VIN?: string;
  PlateNumber?: string;
  Make?: string;
  Model?: string;
  Year?: number;
  InsuranceNumber?: string;
  InsuranceExpiryDate?: Date;
  RoadworthyNumber?: string;
  RoadworthyExpiryDate?: Date;
  Weight?: number;
  Capacity?: number;
  VehicleState?: string;
  Remarks?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Vendor_Creation {
  S_No?: number;
  account_group?: string;
  account_name?: string;
  account_number?: string;
  contactperson?: string;
  Physical_address?: string;
  Postal_Address?: string;
  City_Town?: string;
  Region_state?: string;
  phone?: string;
  fax?: string;
  e_mail?: string;
  dated?: string;
  status?: string;
  opening_balance?: number;
  obnature?: string;
  credit_limit?: number;
  Narrations?: string;
  super_group?: string;
  under?: string;
  TIN?: string;
  entryid?: string;
  entrydate?: Date;
  DigitalAddress?: string;
  OrganisationId?: string;
  BranchId?: string;
}

export interface Warehouse_Tbl {
  Refno?: number;
  ProductID?: string;
  ProductName?: string;
  BatchNo?: string;
  Manufacturer?: string;
  SupplierID?: string;
  CategoryID?: string;
  Subcategory?: string;
  QuantityPerUnit?: string;
  UnitPrice?: number;
  Wholesalesprice?: number;
  HI_Unitprice?: number;
  DiscountPercentage?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: string;
  EntryID?: string;
  CostPrice?: number;
  ProfitorLoss?: number;
  barcodenr?: string;
  tax_rate?: number;
  itemlocation?: string;
  Photo?: any;
  EntryDate?: Date;
  ExpiryDate?: Date;
  originalunitprice?: number;
  SellingUnit?: string;
  Max_Stock?: number;
  Countryoforigin?: string;
  RetailUnitInPacks?: number;
  QtyInCarton?: number;
  CartonUnit?: string;
  QtyPerPortion?: number;
  RetailSellingUnit?: string;
  Store?: string;
  AllowCustomPricing?: string;
  RetailStockUnit?: number;
  Shotprice?: number;
  PortionCost?: number;
  PortionProfit?: number;
  Storage_Two?: number;
  Storage_Three?: number;
  Storage_Four?: number;
  Storage_five?: number;
  Storage_Six?: number;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  WholesaleStock?: number;
  RetailStock?: number;
  OtherStoreStock?: number;
  WholesaleStockOnOrder?: number;
  RetailStockOnOrder?: number;
  OtherStoreStockOnOrder?: number;
  OrganisationId?: string;
  BranchId?: string;
}
