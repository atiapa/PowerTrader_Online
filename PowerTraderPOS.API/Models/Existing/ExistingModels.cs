using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PowerTraderPOS.API.Models.Existing
{
    [Table("systemuserpro")]
    public class SystemUserPro
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("username")]
        [MaxLength(100)]
        public string? Username { get; set; }

        [Column("password")]
        [MaxLength(255)]
        public string? Password { get; set; }

        [Column("fullname")]
        [MaxLength(200)]
        public string? FullName { get; set; }

        [Column("user_role")]
        [MaxLength(50)]
        public string? UserRole { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }

        [Column("created_date")]
        public DateTime? CreatedDate { get; set; }

        [Column("last_login")]
        public DateTime? LastLogin { get; set; }
    }

    [Table("staff_information")]
    public class StaffInformation
    {
        [Key]
        [Column("staff_id")]
        public int StaffId { get; set; }

        [Column("staff_name")]
        [MaxLength(200)]
        public string? StaffName { get; set; }

        [Column("staff_phone")]
        [MaxLength(50)]
        public string? StaffPhone { get; set; }

        [Column("staff_email")]
        [MaxLength(100)]
        public string? StaffEmail { get; set; }

        [Column("staff_role")]
        [MaxLength(50)]
        public string? StaffRole { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }

    [Table("products_tbl")]
    public class ProductsTbl
    {
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }

        [Column("product_code")]
        [MaxLength(50)]
        public string? ProductCode { get; set; }

        [Column("product_name")]
        [MaxLength(200)]
        public string? ProductName { get; set; }

        [Column("product_description")]
        [MaxLength(500)]
        public string? ProductDescription { get; set; }

        [Column("unit_price")]
        [Precision(18, 2)]
        public decimal? UnitPrice { get; set; }

        [Column("cost_price")]
        [Precision(18, 2)]
        public decimal? CostPrice { get; set; }

        [Column("category_id")]
        public int? CategoryId { get; set; }

        [Column("subcategory_id")]
        public int? SubcategoryId { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }

    [Table("tbl_Customer_Info")]
    public class CustomerInfo
    {
        [Key]
        [Column("Refno")]
        public decimal Refno { get; set; }

        [Column("AccountName")]
        [MaxLength(200)]
        public string? AccountName { get; set; }

        [Column("Surname")]
        [MaxLength(50)]
        public string? Surname { get; set; }

        [Column("Othernames")]
        [MaxLength(100)]
        public string? Othernames { get; set; }

        [Column("AccountNr")]
        [MaxLength(50)]
        public string? AccountNr { get; set; }

        [Column("Address")]
        public string? Address { get; set; }

        [Column("City_Town")]
        [MaxLength(100)]
        public string? CityTown { get; set; }

        [Column("Region_State")]
        [MaxLength(100)]
        public string? RegionState { get; set; }

        [Column("PhoneNr")]
        [MaxLength(100)]
        public string? PhoneNr { get; set; }

        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        [Column("CustomerType")]
        [MaxLength(50)]
        public string? CustomerType { get; set; }

        [Column("Sales_Rep")]
        [MaxLength(100)]
        public string? SalesRep { get; set; }

        [Column("OpeningBalance")]
        [Precision(18, 2)]
        public decimal? OpeningBalance { get; set; }

        [Column("Email")]
        [MaxLength(100)]
        public string? Email { get; set; }

        [Column("DigitalAddress")]
        [MaxLength(50)]
        public string? DigitalAddress { get; set; }

        [Column("Barcodenr")]
        [MaxLength(50)]
        public string? Barcodenr { get; set; }

        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }

    [Table("suppliers")]
    public class Suppliers
    {
        [Key]
        [Column("supplier_id")]
        public int SupplierId { get; set; }

        [Column("supplier_name")]
        [MaxLength(200)]
        public string? SupplierName { get; set; }

        [Column("supplier_phone")]
        [MaxLength(50)]
        public string? SupplierPhone { get; set; }

        [Column("supplier_email")]
        [MaxLength(100)]
        public string? SupplierEmail { get; set; }

        [Column("supplier_address")]
        [MaxLength(500)]
        public string? SupplierAddress { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }

    [Table("sales_details")]
    public class SalesDetails
    {
        [Key]
        [Column("sale_id")]
        public int SaleId { get; set; }

        [Column("invoice_no")]
        [MaxLength(50)]
        public string? InvoiceNo { get; set; }

        [Column("sale_date")]
        public DateTime? SaleDate { get; set; }

        [Column("customer_id")]
        public int? CustomerId { get; set; }

        [Column("total_amount")]
        [Precision(18, 2)]
        public decimal? TotalAmount { get; set; }

        [Column("tax_amount")]
        [Precision(18, 2)]
        public decimal? TaxAmount { get; set; }

        [Column("discount_amount")]
        [Precision(18, 2)]
        public decimal? DiscountAmount { get; set; }

        [Column("net_amount")]
        [Precision(18, 2)]
        public decimal? NetAmount { get; set; }

        [Column("payment_method")]
        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        [Column("user_id")]
        public int? UserId { get; set; }

        [Column("session_id")]
        public int? SessionId { get; set; }

        [Column("status")]
        [MaxLength(50)]
        public string? Status { get; set; }
    }

    [Table("stock_master")]
    public class StockMaster
    {
        [Key]
        [Column("stock_id")]
        public int StockId { get; set; }

        [Column("product_id")]
        public int? ProductId { get; set; }

        [Column("warehouse_id")]
        public int? WarehouseId { get; set; }

        [Column("quantity")]
        public int? Quantity { get; set; }

        [Column("reorder_level")]
        public int? ReorderLevel { get; set; }

        [Column("last_updated")]
        public DateTime? LastUpdated { get; set; }
    }

    [Table("session_creation")]
    public class SessionCreation
    {
        [Key]
        [Column("session_id")]
        public int SessionId { get; set; }

        [Column("user_id")]
        public int? UserId { get; set; }

        [Column("session_start")]
        public DateTime? SessionStart { get; set; }

        [Column("session_end")]
        public DateTime? SessionEnd { get; set; }

        [Column("opening_balance")]
        [Precision(18, 2)]
        public decimal? OpeningBalance { get; set; }

        [Column("closing_balance")]
        [Precision(18, 2)]
        public decimal? ClosingBalance { get; set; }

        [Column("status")]
        [MaxLength(50)]
        public string? Status { get; set; }
    }

    [Table("payment_voucher")]
    public class PaymentVoucher
    {
        [Key]
        [Column("voucher_id")]
        public int VoucherId { get; set; }

        [Column("voucher_no")]
        [MaxLength(50)]
        public string? VoucherNo { get; set; }

        [Column("voucher_date")]
        public DateTime? VoucherDate { get; set; }

        [Column("amount")]
        [Precision(18, 2)]
        public decimal? Amount { get; set; }

        [Column("payment_method")]
        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        [Column("description")]
        [MaxLength(500)]
        public string? Description { get; set; }

        [Column("user_id")]
        public int? UserId { get; set; }
    }

    [Table("vehicle_records")]
    public class VehicleRecords
    {
        [Key]
        [Column("vehicle_id")]
        public int VehicleId { get; set; }

        [Column("vehicle_reg_no")]
        [MaxLength(50)]
        public string? VehicleRegNo { get; set; }

        [Column("vehicle_type")]
        [MaxLength(100)]
        public string? VehicleType { get; set; }

        [Column("driver_name")]
        [MaxLength(200)]
        public string? DriverName { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }

    [Table("tbl_servicing")]
    public class TblServicing
    {
        [Key]
        [Column("service_id")]
        public int ServiceId { get; set; }

        [Column("service_date")]
        public DateTime? ServiceDate { get; set; }

        [Column("customer_id")]
        public int? CustomerId { get; set; }

        [Column("service_type")]
        [MaxLength(100)]
        public string? ServiceType { get; set; }

        [Column("service_description")]
        [MaxLength(500)]
        public string? ServiceDescription { get; set; }

        [Column("service_amount")]
        [Precision(18, 2)]
        public decimal? ServiceAmount { get; set; }

        [Column("status")]
        [MaxLength(50)]
        public string? Status { get; set; }
    }

    [Table("organisation_information")]
    public class OrganisationInformation
    {
        [Key]
        [Column("org_id")]
        public int OrgId { get; set; }

        [Column("org_name")]
        [MaxLength(200)]
        public string? OrgName { get; set; }

        [Column("org_address")]
        [MaxLength(500)]
        public string? OrgAddress { get; set; }

        [Column("org_phone")]
        [MaxLength(50)]
        public string? OrgPhone { get; set; }

        [Column("org_email")]
        [MaxLength(100)]
        public string? OrgEmail { get; set; }

        [Column("tax_id")]
        [MaxLength(50)]
        public string? TaxId { get; set; }
    }

    [Table("warehouse_tbl")]
    public class WarehouseTbl
    {
        [Key]
        [Column("warehouse_id")]
        public int WarehouseId { get; set; }

        [Column("warehouse_name")]
        [MaxLength(200)]
        public string? WarehouseName { get; set; }

        [Column("warehouse_location")]
        [MaxLength(500)]
        public string? WarehouseLocation { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
