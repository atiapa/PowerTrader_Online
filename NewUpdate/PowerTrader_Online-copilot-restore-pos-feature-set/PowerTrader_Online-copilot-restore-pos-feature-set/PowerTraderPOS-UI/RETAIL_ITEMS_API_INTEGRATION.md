# Retail Items API Integration - POS Database

## Overview
The Retail Sales Point component is fully integrated with the POS database backend to fetch real-time data from the following tables:
- **Categories** table
- **Subcategories** table  
- **Retail_Items** table

## Data Flow

### 1. Initial Load (ngOnInit)
When the Retail Sales Point loads, it automatically fetches data from the POS database:

```typescript
loadInitialData() {
  // Loads all categories from Categories table
  this.loadCategories();
  
  // Loads all subcategories from Subcategories table
  this.loadSubcategories();
  
  // Loads all retail items from Retail_Items table
  this.loadProducts();
}
```

### 2. API Endpoints Used

#### Categories
- **GET** `/api/Categories` - Fetch all categories
- **GET** `/api/Categories/{id}` - Fetch single category

#### Subcategories
- **GET** `/api/Subcategories` - Fetch all subcategories
- **GET** `/api/Subcategories/category/{categoryId}` - Fetch subcategories by category
- **GET** `/api/Subcategories/{id}` - Fetch single subcategory

#### Retail Items
- **GET** `/api/RetailItems` - Fetch all retail items
- **GET** `/api/RetailItems/{id}` - Fetch single item
- **GET** `/api/RetailItems/barcode/{barcode}` - Fetch item by barcode
- **GET** `/api/RetailItems/category/{categoryId}` - Fetch items by category
- **GET** `/api/RetailItems/subcategory/{subcategoryId}` - Fetch items by subcategory
- **GET** `/api/RetailItems/search?searchTerm=...&categoryId=...&subcategoryId=...&isActive=true` - Advanced search

### 3. Database Schema Mapping

#### Categories Table
```typescript
interface Category {
  id: number;                    // Primary Key
  categoryName: string;          // Category name
  description?: string;          // Optional description
  isActive: boolean;             // Active status
  createdDate?: Date;            // Creation timestamp
  modifiedDate?: Date;           // Last modified timestamp
}
```

#### Subcategories Table
```typescript
interface Subcategory {
  id: number;                    // Primary Key
  subcategoryName: string;       // Subcategory name
  categoryId: number;            // Foreign Key to Categories
  categoryName?: string;         // Category name (joined)
  description?: string;          // Optional description
  isActive: boolean;             // Active status
  createdDate?: Date;            // Creation timestamp
  modifiedDate?: Date;           // Last modified timestamp
}
```

#### Retail_Items Table
```typescript
interface RetailItem {
  id: number;                    // Primary Key
  itemCode: string;              // Unique item code
  itemName: string;              // Product name
  barcode?: string;              // Barcode/SKU
  categoryId?: number;           // Foreign Key to Categories
  categoryName?: string;         // Category name (joined)
  subcategoryId?: number;        // Foreign Key to Subcategories
  subcategoryName?: string;      // Subcategory name (joined)
  unitPrice: number;             // Selling price
  costPrice: number;             // Cost price
  unitInstock: number;           // Available quantity
  reorderLevel?: number;         // Reorder threshold
  description?: string;          // Product description
  imageUrl?: string;             // Product image URL
  isActive: boolean;             // Active status
  createdDate?: Date;            // Creation timestamp
  modifiedDate?: Date;           // Last modified timestamp
  organisationCode?: string;     // Organization code
  branchCode?: string;           // Branch code
}
```

### 4. Features Implemented

#### Category Browsing
- Click on a category to filter products from Retail_Items table by categoryId
- Backend endpoint: `GET /api/RetailItems/category/{categoryId}`
- Automatically loads subcategories for selected category

#### Subcategory Filtering
- After selecting a category, click subcategory to further filter
- Backend endpoint: `GET /api/RetailItems/subcategory/{subcategoryId}`
- Cascading filters: Category → Subcategory → Products

#### Product Search
- Type in search box to find products by name, code, or barcode
- Backend endpoint: `GET /api/RetailItems/search?searchTerm={term}&isActive=true`
- Real-time filtering with database query

#### Barcode Scanning
- Enter barcode and click "Scan Product"
- Backend endpoint: `GET /api/RetailItems/barcode/{barcode}`
- Instantly adds product to cart if found

#### Cart Management
- Add products to cart with quantity controls
- Stock validation against `unitInstock` from database
- Real-time total calculations

#### Checkout & Sales
- Complete sales with payment methods
- Backend endpoint: `POST /api/Sales`
- Updates inventory after successful sale

### 5. Console Logging
The component logs all database operations to the browser console:
- `Loaded categories from POS database: {count}`
- `Loaded subcategories from POS database: {count}`
- `Loaded retail items from POS database: {count}`
- `Loaded {count} products for category {categoryId}`
- `Loaded {count} products for subcategory {subcategoryId}`

### 6. Error Handling
All API calls include error handling:
- Network errors show user-friendly snackbar messages
- Console logs detailed error information
- Fallback to client-side filtering if server filtering fails

### 7. Performance Optimizations

#### Server-Side Filtering
Instead of loading all products and filtering client-side, the component can request filtered data from the backend:

```typescript
// Load products by category (server-side filter)
selectCategory(category) {
  this.apiService.getRetailItemsByCategory(category.id);
}

// Load products by subcategory (server-side filter)
selectSubcategory(subcategory) {
  this.apiService.getRetailItemsBySubcategory(subcategory.id);
}
```

#### Client-Side Filtering
For better UX, the component also includes computed signals for instant client-side filtering:

```typescript
filteredProducts = computed(() => {
  let filtered = this.products();
  
  // Filter by selected category
  if (this.selectedCategory()) {
    filtered = filtered.filter(p => p.categoryId === this.selectedCategory().id);
  }
  
  // Filter by selected subcategory
  if (this.selectedSubcategory()) {
    filtered = filtered.filter(p => p.subcategoryId === this.selectedSubcategory().id);
  }
  
  // Filter by search term
  if (this.searchTerm) {
    filtered = filtered.filter(p => 
      p.itemName.includes(this.searchTerm) ||
      p.itemCode.includes(this.searchTerm) ||
      p.barcode.includes(this.searchTerm)
    );
  }
  
  // Only show active items
  return filtered.filter(p => p.isActive);
});
```

### 8. Backend Requirements

For this integration to work, the backend must implement these controllers:

1. **CategoriesController** - CRUD operations for Categories table
2. **SubcategoriesController** - CRUD operations for Subcategories table
3. **RetailItemsController** - CRUD operations for Retail_Items table

See `BACKEND_API_ENDPOINTS.md` for complete API specification.

### 9. Testing Checklist

To verify the integration is working:

1. ✅ Open browser console (F12)
2. ✅ Login to POS with PIN 1111 (Sales role)
3. ✅ Navigate to Retail Sales Point
4. ✅ Check console for "Loaded categories/subcategories/retail items from POS database"
5. ✅ Verify category buttons appear from database
6. ✅ Click category and verify subcategories load
7. ✅ Verify products display with correct prices from Retail_Items table
8. ✅ Test barcode scanner with existing barcode from database
9. ✅ Test product search functionality
10. ✅ Add items to cart and verify stock validation

### 10. Troubleshooting

#### No Categories/Products Loading
- Check backend server is running on `http://localhost:5000`
- Verify database connection string in backend
- Check Categories, Subcategories, and Retail_Items tables have data
- Open Network tab in browser to see API responses

#### API Errors in Console
- Verify API endpoints match backend controller routes
- Check CORS is enabled on backend for `http://localhost:4200`
- Verify authentication token is valid
- Check database permissions

#### Products Not Filtering
- Verify categoryId and subcategoryId foreign keys are set correctly in Retail_Items table
- Check isActive = true for items that should display
- Verify backend filter endpoints are implemented

## Summary

The Retail Sales Point is fully configured to pull live data from your POS database. All three tables (Categories, Subcategories, Retail_Items) are integrated through the ApiService, which calls your backend API endpoints. The component uses Angular signals for reactive state management and includes both server-side and client-side filtering for optimal performance.
