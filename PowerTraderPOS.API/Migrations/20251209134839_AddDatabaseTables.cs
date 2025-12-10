using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PowerTraderPOS.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDatabaseTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "products_tbl",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    product_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    product_description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    unit_price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    cost_price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    category_id = table.Column<int>(type: "int", nullable: true),
                    subcategory_id = table.Column<int>(type: "int", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products_tbl", x => x.product_id);
                });

            migrationBuilder.CreateTable(
                name: "sales_details",
                columns: table => new
                {
                    sale_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    invoice_no = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    sale_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    customer_id = table.Column<int>(type: "int", nullable: true),
                    total_amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    tax_amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    discount_amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    net_amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    payment_method = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    session_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sales_details", x => x.sale_id);
                });

            migrationBuilder.CreateTable(
                name: "staff_information",
                columns: table => new
                {
                    staff_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    staff_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    staff_phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    staff_email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    staff_role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staff_information", x => x.staff_id);
                });

            migrationBuilder.CreateTable(
                name: "suppliers",
                columns: table => new
                {
                    supplier_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    supplier_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    supplier_phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    supplier_email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    supplier_address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_suppliers", x => x.supplier_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_customer_info",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customer_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    customer_phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    customer_email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    customer_address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_customer_info", x => x.customer_id);
                });

            migrationBuilder.CreateTable(
                name: "Tenants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PIN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TransactionNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NetAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CustomerPhone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sales_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sales_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SaleItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaleId = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NetPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleItems_Sales_SaleId",
                        column: x => x.SaleId,
                        principalTable: "Sales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Tenants",
                columns: new[] { "Id", "Code", "CreatedDate", "IsActive", "ModifiedDate", "Name" },
                values: new object[] { 1, "DEMO", new DateTime(2025, 12, 9, 13, 48, 37, 849, DateTimeKind.Utc).AddTicks(4390), true, null, "Demo Tenant" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Code", "Cost", "CreatedDate", "Description", "IsActive", "ModifiedDate", "Name", "Price", "StockQuantity", "TenantId" },
                values: new object[,]
                {
                    { 1, "General", "PROD001", 5.50m, new DateTime(2025, 12, 9, 13, 48, 39, 42, DateTimeKind.Utc).AddTicks(2239), "Sample product for testing", true, null, "Sample Product 1", 10.99m, 100, 1 },
                    { 2, "General", "PROD002", 12.50m, new DateTime(2025, 12, 9, 13, 48, 39, 42, DateTimeKind.Utc).AddTicks(2242), "Another sample product", true, null, "Sample Product 2", 25.99m, 50, 1 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedDate", "FullName", "IsActive", "LastLoginDate", "PIN", "Role", "TenantId", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 12, 9, 13, 48, 37, 998, DateTimeKind.Utc).AddTicks(3293), "Admin User", true, null, "$2a$11$WGHRX7QT0v90ZyfaTUIV7.AOg5ol/IGvgbOLGd./HLvJQtViBTqB6", "Admin", 1, "admin" },
                    { 2, new DateTime(2025, 12, 9, 13, 48, 38, 148, DateTimeKind.Utc).AddTicks(6456), "Sales User", true, null, "$2a$11$WcfNPPvvDb0Z7nd9XfMsY.QF6VPBWunHCr/zJD.Qffs0Geyhp4hta", "Sales", 1, "sales" },
                    { 3, new DateTime(2025, 12, 9, 13, 48, 38, 297, DateTimeKind.Utc).AddTicks(1969), "Finance User", true, null, "$2a$11$4gMqVXfOhm1x1BU1E4a6lOB/eFK4IvTD2RBJa57BUotHsBS0Z8M6y", "Finance", 1, "finance" },
                    { 4, new DateTime(2025, 12, 9, 13, 48, 38, 451, DateTimeKind.Utc).AddTicks(1455), "HR User", true, null, "$2a$11$t5fu4j/isDvNxpBTS6x4p.u6l5HGw2yN10/.TdhEGWXKLeFDkx2ru", "HR", 1, "hr" },
                    { 5, new DateTime(2025, 12, 9, 13, 48, 38, 598, DateTimeKind.Utc).AddTicks(8793), "Fleet User", true, null, "$2a$11$cvvTRonXpxd6F.3iR9ZJneB.k9UDsnwVes57xRszSHeoJj8fmad4q", "Fleet", 1, "fleet" },
                    { 6, new DateTime(2025, 12, 9, 13, 48, 38, 746, DateTimeKind.Utc).AddTicks(6552), "Service User", true, null, "$2a$11$ndfWzpl5SWhKWrR5ppaCLuBiznmueh8JGZF4K93L4Cmko3F56qOi2", "Service", 1, "service" },
                    { 7, new DateTime(2025, 12, 9, 13, 48, 38, 894, DateTimeKind.Utc).AddTicks(4198), "Suppliers User", true, null, "$2a$11$RvohTUPjgR00eQLC9VRMuOJmHbGh2/lQeHOtlemfQDcQY0/Ko7hvK", "Suppliers", 1, "suppliers" },
                    { 8, new DateTime(2025, 12, 9, 13, 48, 39, 42, DateTimeKind.Utc).AddTicks(1421), "Customers User", true, null, "$2a$11$OjHjQBvFg/97qdf9rRm0Euk3AqKuxBort5/jqFw7e.y1yWwjdWhDK", "Customers", 1, "customers" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_TenantId_Code",
                table: "Products",
                columns: new[] { "TenantId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_SaleId",
                table: "SaleItems",
                column: "SaleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_TenantId",
                table: "Sales",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_TransactionNumber",
                table: "Sales",
                column: "TransactionNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sales_UserId",
                table: "Sales",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tenants_Code",
                table: "Tenants",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TenantId_Username",
                table: "Users",
                columns: new[] { "TenantId", "Username" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "products_tbl");

            migrationBuilder.DropTable(
                name: "SaleItems");

            migrationBuilder.DropTable(
                name: "sales_details");

            migrationBuilder.DropTable(
                name: "staff_information");

            migrationBuilder.DropTable(
                name: "suppliers");

            migrationBuilder.DropTable(
                name: "tbl_customer_info");

            migrationBuilder.DropTable(
                name: "Sales");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Tenants");
        }
    }
}
