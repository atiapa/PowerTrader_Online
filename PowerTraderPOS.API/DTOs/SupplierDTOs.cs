namespace PowerTraderPOS.API.DTOs
{
    // Supplier DTOs
    public class SupplierDto
    {
        public int SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public string? SupplierPhone { get; set; }
        public string? SupplierEmail { get; set; }
        public string? SupplierAddress { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CreateSupplierDto
    {
        public string SupplierName { get; set; } = string.Empty;
        public string? SupplierPhone { get; set; }
        public string? SupplierEmail { get; set; }
        public string? SupplierAddress { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class UpdateSupplierDto
    {
        public string? SupplierName { get; set; }
        public string? SupplierPhone { get; set; }
        public string? SupplierEmail { get; set; }
        public string? SupplierAddress { get; set; }
        public bool? IsActive { get; set; }
    }
}
