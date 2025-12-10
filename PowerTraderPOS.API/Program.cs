using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.Services;
using PowerTraderPOS.API.Services.Interfaces;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add Database Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppDbContext")));

// Add HTTP Context Accessor for multi-tenant support
builder.Services.AddHttpContextAccessor();

// Register Multi-Tenant Infrastructure Services
builder.Services.AddScoped<IUserContextService, UserContextService>();

// Register Business Services
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<ISalesDetailsService, SalesDetailsService>();
builder.Services.AddScoped<IStockMasterService, StockMasterService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();

// Register Retail Sales Point Services
// Phase 1A: Gift Cards
builder.Services.AddScoped<IGiftCardService, GiftCardService>();
// Phase 1B: Inventory Management
builder.Services.AddScoped<IInventoryService, InventoryService>();
// Phase 1C: Pending Sales (Hold Orders)
builder.Services.AddScoped<IRetailSalesService, RetailSalesService>();
// Phase 1D: Returns Processing
builder.Services.AddScoped<IReturnService, ReturnService>();
// Phase 1E: Financial Integration
builder.Services.AddScoped<IAccountingService, AccountingService>();

// Add JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? "DefaultSecretKey";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// Add Authorization
builder.Services.AddAuthorization();

// Add Controllers
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();

// Use Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
