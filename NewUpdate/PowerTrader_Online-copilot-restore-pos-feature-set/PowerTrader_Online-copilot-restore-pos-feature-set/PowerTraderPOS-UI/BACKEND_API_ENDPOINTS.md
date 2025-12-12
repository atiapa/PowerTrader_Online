# Backend API Endpoints for POS System

## Base URL
`http://localhost:5000/api`

## Categories API

### Get All Categories
```
GET /api/Categories
Response: Category[]
```

### Get Category by ID
```
GET /api/Categories/{id}
Response: Category
```

**Category Model:**
```csharp
public class Category
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
```

## Subcategories API

### Get All Subcategories
```
GET /api/Subcategories
Response: Subcategory[]
```

### Get Subcategories by Category
```
GET /api/Subcategories/category/{categoryId}
Response: Subcategory[]
```

### Get Subcategory by ID
```
GET /api/Subcategories/{id}
Response: Subcategory
```

**Subcategory Model:**
```csharp
public class Subcategory
{
    public int Id { get; set; }
    public string SubcategoryName { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
```

## Retail Items API (Linked to POS Database)

### Get All Retail Items
```
GET /api/RetailItems
Response: RetailItem[]
```

### Get Retail Item by ID
```
GET /api/RetailItems/{id}
Response: RetailItem
```

### Search Retail Items
```
GET /api/RetailItems/search?searchTerm={term}&barcode={barcode}&categoryId={id}&subcategoryId={id}&isActive={bool}
Query Parameters:
  - searchTerm: string (optional) - Search by item name, code, or description
  - barcode: string (optional) - Search by barcode
  - categoryId: number (optional) - Filter by category
  - subcategoryId: number (optional) - Filter by subcategory
  - isActive: boolean (optional) - Filter active/inactive items
Response: RetailItem[]
```

### Get Retail Item by Barcode
```
GET /api/RetailItems/barcode/{barcode}
Response: RetailItem
```

### Get Retail Items by Category
```
GET /api/RetailItems/category/{categoryId}
Response: RetailItem[]
```

### Get Retail Items by Subcategory
```
GET /api/RetailItems/subcategory/{subcategoryId}
Response: RetailItem[]
```

**RetailItem Model (Retail_Items Table):**
```csharp
public class RetailItem
{
    public int Id { get; set; }
    public string ItemCode { get; set; }
    public string ItemName { get; set; }
    public string Barcode { get; set; }
    public int? CategoryId { get; set; }
    public string CategoryName { get; set; }
    public int? SubcategoryId { get; set; }
    public string SubcategoryName { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal CostPrice { get; set; }
    public int UnitInstock { get; set; }
    public int? ReorderLevel { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string OrganisationCode { get; set; }
    public string BranchCode { get; set; }
}
```

## Database Tables

### Categories Table
```sql
CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME
)
```

### Subcategories Table
```sql
CREATE TABLE Subcategories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    SubcategoryName NVARCHAR(100) NOT NULL,
    CategoryId INT NOT NULL,
    Description NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
)
```

### Retail_Items Table (POS Database)
```sql
CREATE TABLE Retail_Items (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ItemCode NVARCHAR(50) UNIQUE NOT NULL,
    ItemName NVARCHAR(200) NOT NULL,
    Barcode NVARCHAR(50),
    CategoryId INT,
    SubcategoryId INT,
    UnitPrice DECIMAL(18,2) NOT NULL,
    CostPrice DECIMAL(18,2) NOT NULL,
    UnitInstock INT DEFAULT 0,
    ReorderLevel INT DEFAULT 5,
    Description NVARCHAR(500),
    ImageUrl NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME,
    OrganisationCode NVARCHAR(50),
    BranchCode NVARCHAR(50),
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
    FOREIGN KEY (SubcategoryId) REFERENCES Subcategories(Id)
)
```

## Frontend Features Implemented

1. **Category Browsing**
   - Display all categories as filter buttons
   - Select category to filter products
   - "All Categories" option to show all products

2. **Subcategory Browsing**
   - Dynamically show subcategories when category selected
   - Filter products by subcategory
   - Cascading selection (category → subcategory)

3. **Product Search**
   - Search by item name, code, description, or barcode
   - Real-time search with Enter key
   - Search button for manual trigger

4. **Barcode Scanner**
   - Dedicated barcode input field
   - Scan and add product directly to cart
   - Enter key or Scan button to process
   - Success notification with product name

5. **Backend Integration**
   - All data loaded from API endpoints
   - Category/Subcategory linked to products
   - RetailItem model matches POS database schema
   - Real-time inventory checking (UnitInstock)

## Mock User PINs
- **0000** - Admin
- **1111** - Sales (POS Access)
- **2222** - Finance
- **3333** - HR
- **4444** - Fleet
- **5555** - Service
- **6666** - Suppliers
- **7777** - Customers
