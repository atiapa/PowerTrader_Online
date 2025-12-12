# Mock User Accounts for Adinkra PowerTrader

## Login Instructions
The system now uses PIN-only authentication. Simply enter the 4-digit PIN on the login page.

## Available Mock Users

| Role | PIN | Full Name | Dashboard Route |
|------|-----|-----------|----------------|
| Admin | 0000 | System Administrator | /admin |
| Sales | 1111 | Sales User | /sales |
| Finance | 2222 | Finance Manager | /finance |
| HR | 3333 | HR Manager | /hr |
| Fleet | 4444 | Fleet Manager | /fleet |
| Service | 5555 | Service Manager | /service |
| Suppliers | 6666 | Suppliers Manager | /suppliers |
| Customers | 7777 | Customers Manager | /customers |

## Features
- **PIN-Only Login**: No username required
- **Auto-Login**: Automatically logs in when 4 digits are entered
- **No Backspace Button**: Use the Clear button to reset PIN
- **Role-Based Routing**: Each user is automatically redirected to their respective dashboard

## Testing
1. Start the application: `npm start`
2. Navigate to the login page
3. Enter any of the PINs listed above (e.g., 0000 for Admin)
4. You will be automatically redirected to the corresponding dashboard

## Navigation
All routes are protected by the `authGuard`. Users must be authenticated to access any dashboard.
