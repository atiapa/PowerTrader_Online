using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models;
using PowerTraderPOS.API.Models.Existing;
using TablesProductsTbl = PowerTraderPOS.API.Models.Tables.ProductsTbl;
using TablesCustomerInfo = PowerTraderPOS.API.Models.Tables.CustomerInfo;
using TablesSuppliers = PowerTraderPOS.API.Models.Tables.Suppliers;
using TablesSalesDetails = PowerTraderPOS.API.Models.Tables.SalesDetails;
using TablesStaffInformation = PowerTraderPOS.API.Models.Tables.StaffInformation;
using PowerTraderPOS.API.Models.Tables;

namespace PowerTraderPOS.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; }
        public DbSet<Product> Products { get; set; }
        
        // Database Tables
        public DbSet<TablesProductsTbl> ProductsTbl { get; set; }
        public DbSet<TablesCustomerInfo> CustomerInfo { get; set; }
        public DbSet<TablesSuppliers> Suppliers { get; set; }
        public DbSet<TablesSalesDetails> SalesDetails { get; set; }
        public DbSet<TablesStaffInformation> StaffInformation { get; set; }
        
        // Additional Tables
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Branches> Branches { get; set; }
        public DbSet<AccountsCreation> AccountsCreation { get; set; }
        public DbSet<ATCTbl> ATCTbl { get; set; }
        public DbSet<AttendanceTbl> AttendanceTbl { get; set; }
        public DbSet<Countries> Countries { get; set; }
        public DbSet<StockMaster> StockMaster { get; set; }
        public DbSet<SessionCreation> SessionCreation { get; set; }
        public DbSet<PaymentVoucher> PaymentVoucher { get; set; }
        public DbSet<VehicleRecords> VehicleRecords { get; set; }
        public DbSet<TblServicing> TblServicing { get; set; }
        public DbSet<OrganisationInformation> OrganisationInformation { get; set; }
        public DbSet<WarehouseTbl> WarehouseTbl { get; set; }

        // Retail Sales Point Tables (Phase 1A: Gift Cards)
        public DbSet<SalesDetailsGifts> SalesDetailsGifts { get; set; }
        public DbSet<GiftCards> GiftCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Tenant
            modelBuilder.Entity<Tenant>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Code).IsUnique();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
            });

            // Configure User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.Username }).IsUnique();
                entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FullName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PIN).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(50);

                entity.HasOne(e => e.Tenant)
                    .WithMany(t => t.Users)
                    .HasForeignKey(e => e.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Sale
            modelBuilder.Entity<Sale>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TransactionNumber).IsUnique();
                entity.Property(e => e.TransactionNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.TaxAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.NetAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.PaymentMethod).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CustomerName).HasMaxLength(200);
                entity.Property(e => e.CustomerPhone).HasMaxLength(50);

                entity.HasOne(e => e.Tenant)
                    .WithMany(t => t.Sales)
                    .HasForeignKey(e => e.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Sales)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure SaleItem
            modelBuilder.Entity<SaleItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ProductName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.ProductCode).IsRequired().HasMaxLength(50);
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.NetPrice).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Sale)
                    .WithMany(s => s.SaleItems)
                    .HasForeignKey(e => e.SaleId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.Code }).IsUnique();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Cost).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Category).HasMaxLength(100);

                entity.HasOne(e => e.Tenant)
                    .WithMany()
                    .HasForeignKey(e => e.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed default tenant
            modelBuilder.Entity<Tenant>().HasData(
                new Tenant
                {
                    Id = 1,
                    Name = "Demo Tenant",
                    Code = "DEMO",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed default users with different roles
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    TenantId = 1,
                    Username = "admin",
                    FullName = "Admin User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Admin",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    TenantId = 1,
                    Username = "sales",
                    FullName = "Sales User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Sales",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 3,
                    TenantId = 1,
                    Username = "finance",
                    FullName = "Finance User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Finance",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 4,
                    TenantId = 1,
                    Username = "hr",
                    FullName = "HR User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "HR",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 5,
                    TenantId = 1,
                    Username = "fleet",
                    FullName = "Fleet User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Fleet",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 6,
                    TenantId = 1,
                    Username = "service",
                    FullName = "Service User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Service",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 7,
                    TenantId = 1,
                    Username = "suppliers",
                    FullName = "Suppliers User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Suppliers",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Id = 8,
                    TenantId = 1,
                    Username = "customers",
                    FullName = "Customers User",
                    PIN = BCrypt.Net.BCrypt.HashPassword("1234"),
                    Role = "Customers",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed sample products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    TenantId = 1,
                    Name = "Sample Product 1",
                    Code = "PROD001",
                    Description = "Sample product for testing",
                    Price = 10.99m,
                    Cost = 5.50m,
                    StockQuantity = 100,
                    Category = "General",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new Product
                {
                    Id = 2,
                    TenantId = 1,
                    Name = "Sample Product 2",
                    Code = "PROD002",
                    Description = "Another sample product",
                    Price = 25.99m,
                    Cost = 12.50m,
                    StockQuantity = 50,
                    Category = "General",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                }
            );
        }
    }
}
