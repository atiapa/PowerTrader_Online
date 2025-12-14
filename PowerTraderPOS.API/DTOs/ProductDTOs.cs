namespace PowerTraderPOS.API.DTOs
{
    // Product DTOs
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string? ProductCode { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? CostPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? SubcategoryId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CreateProductDto
    {
        public string? ProductCode { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? ProductDescription { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal CostPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? SubcategoryId { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class UpdateProductDto
    {
        public string? ProductCode { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? CostPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? SubcategoryId { get; set; }
        public bool? IsActive { get; set; }
    }
}
