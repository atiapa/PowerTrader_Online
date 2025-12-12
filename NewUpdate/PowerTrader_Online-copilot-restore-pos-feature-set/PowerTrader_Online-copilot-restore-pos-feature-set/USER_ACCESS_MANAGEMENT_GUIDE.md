# User Access Management Guide
## Organisation and Branch-Based User Management

This guide documents the implementation of organisation and branch-specific user management and access levels for the PowerTrader POS system.

## Overview

Users and access levels are based on specific Organisation and Branch assignments. This ensures:
- Users belong to a specific OrganisationCode
- Users belong to a specific BranchCode  
- Users can only access data within their assigned org/branch
- Admin users can manage users within their organisational scope
- Complete data isolation and access control

## User Model Schema

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string PIN { get; set; } // BCrypt hashed 4-digit PIN

        // Tenant Assignment (REQUIRED)
        [Required]
        [StringLength(50)]
        public string OrganisationCode { get; set; }

        [StringLength(200)]
        public string? OrganisationName { get; set; }

        [Required]
        [StringLength(50)]
        public string BranchCode { get; set; }

        [StringLength(50)]
        public string? BranchName { get; set; }

        // Role & Permissions
        [Required]
        [StringLength(50)]
        public string Role { get; set; } // Admin, Sales, Finance, HR, Fleet, Service, Suppliers, Customers

        public string? Permissions { get; set; } // JSON array of specific permissions

        // Profile Information
        [StringLength(100)]
        public string? FirstName { get; set; }

        [StringLength(100)]
        public string? LastName { get; set; }

        [StringLength(200)]
        [EmailAddress]
        public string? Email { get; set; }

        [StringLength(50)]
        public string? PhoneNumber { get; set; }

        // Status & Tracking
        public bool IsActive { get; set; } = true;

        public DateTime? LastLogin { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public string? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(50)]
        public string? ModifiedBy { get; set; }

        // Navigation Properties
        public int? TenantId { get; set; }

        [ForeignKey("TenantId")]
        public virtual Tenant? Tenant { get; set; }
    }
}
```

## Access Level Hierarchy

### 1. Super Admin (Optional - System Level)
**Scope**: All Organisations

**Permissions**:
- Access all organisations and branches
- Create/manage organisations
- Create organisation administrators
- System-wide configuration
- View all data across organisations

**Use Case**: Software vendor managing multiple client organisations

### 2. Organisation Admin
**Scope**: Single Organisation, All Branches

**Permissions**:
- Access all branches within their organisation
- Create/manage branches in their organisation
- Create/manage users in their organisation (all branches)
- Assign branch administrators
- View organisation-wide reports
- Cannot change their OrganisationCode
- Cannot access other organisations

**Use Case**: Company headquarters managing multiple store locations

### 3. Branch Admin
**Scope**: Single Organisation, Single Branch

**Permissions**:
- Access only their specific branch
- Create/manage users in their branch only
- View/edit branch-specific data
- Branch-level reporting
- Cannot create branches
- Cannot change their BranchCode
- Cannot access other branches

**Use Case**: Store manager managing their location

### 4. Standard Users (Role-Based)
**Scope**: Single Organisation, Single Branch

**Roles**:
- **Sales**: POS operations, customer management
- **Finance**: Financial reports, accounting
- **HR**: Staff management, attendance
- **Fleet**: Vehicle management, transport
- **Service**: Service requests, maintenance
- **Suppliers**: Procurement, supplier management
- **Customers**: Customer service, support

**Permissions**:
- Access only their branch data
- Role-specific permissions
- Cannot manage users
- Cannot access other branches
- Cannot access other organisations

## API Endpoints

### User Management Controller

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    // GET: api/Users
    // Get all users in authenticated user's org/branch
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    
    // GET: api/Users/5
    // Get user by ID (with tenant check)
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    
    // GET: api/Users/search?term=john
    // Search users (tenant scoped)
    [HttpGet("search")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserDto>>> SearchUsers(string term)
    
    // GET: api/Users/branch/BR001
    // Get users by branch code (organisation admin only)
    [HttpGet("branch/{branchCode}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersByBranch(string branchCode)
    
    // POST: api/Users
    // Create new user (sets org/branch from authenticated user)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto dto)
    
    // PUT: api/Users/5
    // Update user (cannot change org/branch)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> UpdateUser(int id, UpdateUserDto dto)
    
    // DELETE: api/Users/5
    // Deactivate user (soft delete with tenant check)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeactivateUser(int id)
    
    // POST: api/Users/5/reset-pin
    // Reset user PIN (admin only)
    [HttpPost("{id}/reset-pin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ResetUserPIN(int id, ResetPINDto dto)
    
    // PUT: api/Users/5/change-pin
    // User changes their own PIN
    [HttpPut("{id}/change-pin")]
    public async Task<ActionResult> ChangeOwnPIN(int id, ChangePINDto dto)
    
    // GET: api/Users/roles
    // Get available roles
    [HttpGet("roles")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<string>>> GetAvailableRoles()
}
```

### Authentication Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // POST: api/Auth/login
    // Login with organisation and branch validation
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    
    // POST: api/Auth/refresh
    // Refresh JWT token (maintains tenant context)
    [HttpPost("refresh")]
    public async Task<ActionResult<LoginResponse>> RefreshToken(RefreshTokenRequest request)
    
    // POST: api/Auth/logout
    // Logout current user
    [HttpPost("logout")]
    [Authorize]
    public async Task<ActionResult> Logout()
    
    // POST: api/Auth/change-password
    // Change own password
    [HttpPost("change-password")]
    [Authorize]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto dto)
    
    // GET: api/Auth/me
    // Get current authenticated user info
    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserInfoDto>> GetCurrentUser()
}
```

## DTOs

### User DTOs

```csharp
// Read DTO
public class UserDto
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Role { get; set; }
    public string OrganisationCode { get; set; }
    public string OrganisationName { get; set; }
    public string BranchCode { get; set; }
    public string BranchName { get; set; }
    public bool IsActive { get; set; }
    public DateTime? LastLogin { get; set; }
    public DateTime CreatedDate { get; set; }
}

// Create DTO
public class CreateUserDto
{
    [Required]
    public string Username { get; set; }
    
    [Required]
    [MinLength(6)]
    public string Password { get; set; }
    
    [Required]
    [RegularExpression(@"^\d{4}$", ErrorMessage = "PIN must be 4 digits")]
    public string PIN { get; set; }
    
    [Required]
    public string FirstName { get; set; }
    
    [Required]
    public string LastName { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
    
    public string PhoneNumber { get; set; }
    
    [Required]
    public string Role { get; set; }
    
    // Optional: Org admin can specify branch, branch admin uses their own
    public string? BranchCode { get; set; }
}

// Update DTO
public class UpdateUserDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
    // Cannot change OrganisationCode or BranchCode
}

// Login Request
public class LoginRequest
{
    [Required]
    public string Username { get; set; }
    
    [Required]
    public string PIN { get; set; }
}

// Login Response
public class LoginResponse
{
    public string Token { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; }
    public string OrganisationCode { get; set; }
    public string OrganisationName { get; set; }
    public string BranchCode { get; set; }
    public string BranchName { get; set; }
}
```

## Service Implementation

### UserService with Tenant Filtering

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models;

namespace PowerTraderPOS.API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> GetUserByUsernameAsync(string username);
        Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm);
        Task<IEnumerable<UserDto>> GetUsersByBranchAsync(string branchCode);
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto dto);
        Task<bool> DeactivateUserAsync(int id);
        Task<bool> ResetUserPINAsync(int id, string newPIN);
        Task<bool> ChangeUserPINAsync(int id, string oldPIN, string newPIN);
        Task<IEnumerable<string>> GetAvailableRolesAsync();
    }

    public class UserService : BaseService, IUserService
    {
        public UserService(AppDbContext context, IUserContextService userContext)
            : base(context, userContext)
        {
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();

            var query = _context.Users
                .Where(u => u.IsActive && u.OrganisationCode == orgCode);

            // Non-org-admin sees only their branch
            if (!isOrgAdmin)
            {
                query = query.Where(u => u.BranchCode == branchCode);
            }

            return await query
                .Select(u => new UserDto
                {
                    UserId = u.UserId,
                    Username = u.Username,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role,
                    OrganisationCode = u.OrganisationCode,
                    OrganisationName = u.OrganisationName,
                    BranchCode = u.BranchCode,
                    BranchName = u.BranchName,
                    IsActive = u.IsActive,
                    LastLogin = u.LastLogin,
                    CreatedDate = u.CreatedDate
                })
                .OrderBy(u => u.Username)
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();

            var query = _context.Users
                .Where(u => u.UserId == id && u.OrganisationCode == orgCode);

            if (!isOrgAdmin)
            {
                query = query.Where(u => u.BranchCode == branchCode);
            }

            var user = await query.FirstOrDefaultAsync();
            if (user == null) return null;

            return new UserDto
            {
                UserId = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                OrganisationCode = user.OrganisationCode,
                OrganisationName = user.OrganisationName,
                BranchCode = user.BranchCode,
                BranchName = user.BranchName,
                IsActive = user.IsActive,
                LastLogin = user.LastLogin,
                CreatedDate = user.CreatedDate
            };
        }

        public async Task<UserDto?> GetUserByUsernameAsync(string username)
        {
            // This is used for authentication, so no tenant filter
            var user = await _context.Users
                .Where(u => u.Username == username && u.IsActive)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            return new UserDto
            {
                UserId = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                OrganisationCode = user.OrganisationCode,
                OrganisationName = user.OrganisationName,
                BranchCode = user.BranchCode,
                BranchName = user.BranchName,
                IsActive = user.IsActive,
                LastLogin = user.LastLogin
            };
        }

        public async Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();

            var query = _context.Users
                .Where(u => u.IsActive 
                    && u.OrganisationCode == orgCode
                    && (u.Username.Contains(searchTerm) 
                        || u.FirstName.Contains(searchTerm) 
                        || u.LastName.Contains(searchTerm)
                        || u.Email.Contains(searchTerm)));

            if (!isOrgAdmin)
            {
                query = query.Where(u => u.BranchCode == branchCode);
            }

            return await query
                .Select(u => new UserDto { /* ... */ })
                .ToListAsync();
        }

        public async Task<IEnumerable<UserDto>> GetUsersByBranchAsync(string branchCode)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var isOrgAdmin = _userContext.IsAdmin();

            if (!isOrgAdmin)
            {
                throw new UnauthorizedAccessException("Only organisation admins can view users by branch");
            }

            return await _context.Users
                .Where(u => u.IsActive 
                    && u.OrganisationCode == orgCode 
                    && u.BranchCode == branchCode)
                .Select(u => new UserDto { /* ... */ })
                .ToListAsync();
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();
            var currentUserId = _userContext.GetUserId();

            // Determine target branch
            // Org admin can specify branch, branch admin uses their own
            var targetBranchCode = isOrgAdmin && !string.IsNullOrEmpty(dto.BranchCode) 
                ? dto.BranchCode 
                : branchCode;

            // Verify branch exists and belongs to organisation
            var branch = await _context.Branches
                .FirstOrDefaultAsync(b => b.BranchCode == targetBranchCode 
                    && b.OrganisationCode == orgCode
                    && b.IsActive);

            if (branch == null)
            {
                throw new InvalidOperationException("Invalid branch code");
            }

            // Check if username already exists
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            {
                throw new InvalidOperationException("Username already exists");
            }

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                PIN = BCrypt.Net.BCrypt.HashPassword(dto.PIN),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                OrganisationCode = orgCode, // Always creator's organisation
                OrganisationName = branch.OrganisationName,
                BranchCode = targetBranchCode,
                BranchName = branch.BranchName,
                IsActive = true,
                CreatedDate = DateTime.UtcNow,
                CreatedBy = currentUserId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                UserId = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                OrganisationCode = user.OrganisationCode,
                BranchCode = user.BranchCode,
                IsActive = user.IsActive
            };
        }

        public async Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();
            var currentUserId = _userContext.GetUserId();

            var user = await _context.Users
                .Where(u => u.UserId == id && u.OrganisationCode == orgCode)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            // Verify branch ownership for non-org-admin
            if (!isOrgAdmin && user.BranchCode != branchCode)
            {
                throw new UnauthorizedAccessException("Cannot update user from different branch");
            }

            // Update allowed fields (cannot change org/branch)
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;
            user.IsActive = dto.IsActive;
            user.ModifiedDate = DateTime.UtcNow;
            user.ModifiedBy = currentUserId;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new UserDto { /* ... */ };
        }

        public async Task<bool> DeactivateUserAsync(int id)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();
            var currentUserId = _userContext.GetUserId();

            var user = await _context.Users
                .Where(u => u.UserId == id && u.OrganisationCode == orgCode)
                .FirstOrDefaultAsync();

            if (user == null) return false;

            // Verify branch ownership for non-org-admin
            if (!isOrgAdmin && user.BranchCode != branchCode)
            {
                throw new UnauthorizedAccessException("Cannot deactivate user from different branch");
            }

            // Cannot deactivate yourself
            if (user.UserId.ToString() == currentUserId)
            {
                throw new InvalidOperationException("Cannot deactivate your own account");
            }

            user.IsActive = false;
            user.ModifiedDate = DateTime.UtcNow;
            user.ModifiedBy = currentUserId;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ResetUserPINAsync(int id, string newPIN)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isOrgAdmin = _userContext.IsAdmin();

            var user = await _context.Users
                .Where(u => u.UserId == id && u.OrganisationCode == orgCode)
                .FirstOrDefaultAsync();

            if (user == null) return false;

            if (!isOrgAdmin && user.BranchCode != branchCode)
            {
                throw new UnauthorizedAccessException("Cannot reset PIN for user from different branch");
            }

            user.PIN = BCrypt.Net.BCrypt.HashPassword(newPIN);
            user.ModifiedDate = DateTime.UtcNow;
            user.ModifiedBy = _userContext.GetUserId();

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ChangeUserPINAsync(int id, string oldPIN, string newPIN)
        {
            var currentUserId = _userContext.GetUserId();

            // Users can only change their own PIN
            if (id.ToString() != currentUserId)
            {
                throw new UnauthorizedAccessException("Can only change your own PIN");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            // Verify old PIN
            if (!BCrypt.Net.BCrypt.Verify(oldPIN, user.PIN))
            {
                throw new InvalidOperationException("Invalid current PIN");
            }

            user.PIN = BCrypt.Net.BCrypt.HashPassword(newPIN);
            user.ModifiedDate = DateTime.UtcNow;
            user.ModifiedBy = currentUserId;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<string>> GetAvailableRolesAsync()
        {
            // Return available roles
            return await Task.FromResult(new[]
            {
                "Admin",
                "Sales",
                "Finance",
                "HR",
                "Fleet",
                "Service",
                "Suppliers",
                "Customers"
            });
        }
    }
}
```

## AuthController Implementation

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PowerTraderPOS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(
            IUserService userService,
            AppDbContext context,
            IConfiguration configuration)
        {
            _userService = userService;
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {
            // Get user by username
            var userDto = await _userService.GetUserByUsernameAsync(request.Username);

            if (userDto == null || !userDto.IsActive)
            {
                return Unauthorized("Invalid credentials");
            }

            // Get full user record to verify PIN
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // Verify PIN
            if (!BCrypt.Net.BCrypt.Verify(request.PIN, user.PIN))
            {
                return Unauthorized("Invalid credentials");
            }

            // Validate organisation is active
            var organisation = await _context.Organisations
                .FirstOrDefaultAsync(o => o.OrganisationCode == user.OrganisationCode 
                    && o.IsActive);

            if (organisation == null)
            {
                return Unauthorized("Organisation is inactive or does not exist");
            }

            // Validate branch is active
            var branch = await _context.Branches
                .FirstOrDefaultAsync(b => b.BranchCode == user.BranchCode 
                    && b.OrganisationCode == user.OrganisationCode
                    && b.IsActive);

            if (branch == null)
            {
                return Unauthorized("Branch is inactive or does not exist");
            }

            // Generate JWT token with org/branch claims
            var token = GenerateJwtToken(user);

            // Update last login
            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new LoginResponse
            {
                Token = token,
                UserId = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                OrganisationCode = user.OrganisationCode,
                OrganisationName = organisation.OrganisationName,
                BranchCode = user.BranchCode,
                BranchName = branch.BranchName
            });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserInfoDto>> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int id))
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(id);
            
            if (user == null || !user.IsActive)
            {
                return Unauthorized();
            }

            return Ok(new UserInfoDto
            {
                UserId = user.UserId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                OrganisationCode = user.OrganisationCode,
                OrganisationName = user.OrganisationName,
                BranchCode = user.BranchCode,
                BranchName = user.BranchName
            });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.UserId.ToString()),
                new Claim("OrganisationCode", user.OrganisationCode),
                new Claim("BranchCode", user.BranchCode),
                new Claim("FirstName", user.FirstName ?? ""),
                new Claim("LastName", user.LastName ?? ""),
                new Claim(ClaimTypes.GroupSid, user.OrganisationCode), // Alternate
                new Claim(ClaimTypes.Locality, user.BranchCode) // Alternate
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddHours(8);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
```

## Database Schema

### Users Table

```sql
CREATE TABLE Users (
    UserId int IDENTITY(1,1) PRIMARY KEY,
    Username nvarchar(100) NOT NULL UNIQUE,
    PasswordHash nvarchar(MAX) NOT NULL,
    PIN nvarchar(MAX) NOT NULL,
    
    -- Tenant Assignment
    OrganisationCode nvarchar(50) NOT NULL,
    OrganisationName nvarchar(200),
    BranchCode nvarchar(50) NOT NULL,
    BranchName nvarchar(50),
    
    -- Role & Permissions
    Role nvarchar(50) NOT NULL,
    Permissions nvarchar(MAX), -- JSON array
    
    -- Profile
    FirstName nvarchar(100),
    LastName nvarchar(100),
    Email nvarchar(200),
    PhoneNumber nvarchar(50),
    
    -- Status
    IsActive bit NOT NULL DEFAULT 1,
    LastLogin datetime,
    CreatedDate datetime NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy nvarchar(50),
    ModifiedDate datetime,
    ModifiedBy nvarchar(50),
    
    TenantId int,
    
    FOREIGN KEY (OrganisationCode) REFERENCES Organisations(OrganisationCode),
    FOREIGN KEY (BranchCode) REFERENCES Branches(BranchCode)
);

CREATE INDEX IX_Users_Username ON Users(Username);
CREATE INDEX IX_Users_OrgBranch ON Users(OrganisationCode, BranchCode);
CREATE INDEX IX_Users_Role ON Users(Role);
```

### Organisations Table

```sql
CREATE TABLE Organisations (
    OrganisationCode nvarchar(50) PRIMARY KEY,
    OrganisationName nvarchar(200) NOT NULL,
    IsActive bit NOT NULL DEFAULT 1,
    CreatedDate datetime NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy nvarchar(50),
    ModifiedDate datetime,
    ModifiedBy nvarchar(50)
);

CREATE INDEX IX_Organisations_Active ON Organisations(IsActive);
```

### Branches Table (if not already exists)

```sql
CREATE TABLE IF NOT EXISTS Branches (
    BranchCode nvarchar(50) PRIMARY KEY,
    BranchName nvarchar(50) NOT NULL,
    OrganisationCode nvarchar(50) NOT NULL,
    IsActive bit NOT NULL DEFAULT 1,
    CreatedDate datetime NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy nvarchar(50),
    ModifiedDate datetime,
    ModifiedBy nvarchar(50),
    
    FOREIGN KEY (OrganisationCode) REFERENCES Organisations(OrganisationCode)
);

CREATE INDEX IX_Branches_Org ON Branches(OrganisationCode);
CREATE INDEX IX_Branches_Active ON Branches(IsActive);
```

## Testing Checklist

### User Management Tests

- [ ] **Create User**
  - [ ] Org admin can create user in any branch of their org
  - [ ] Branch admin can create user only in their branch
  - [ ] Branch admin cannot create user in other branch
  - [ ] Cannot create user with duplicate username
  - [ ] Cannot create user in different organisation
  - [ ] User inherits creator's organisation code

- [ ] **List Users**
  - [ ] Org admin sees all users in their organisation
  - [ ] Branch admin sees users in their branch only
  - [ ] User from Org A cannot see users from Org B
  - [ ] User from Branch 1 cannot see users from Branch 2
  - [ ] Only active users are returned

- [ ] **Update User**
  - [ ] Admin can update users in their org/branch
  - [ ] Users can update their own profile
  - [ ] Cannot change OrganisationCode
  - [ ] Cannot change BranchCode (without org admin rights)
  - [ ] Cannot update user from different org/branch

- [ ] **Deactivate User**
  - [ ] Admin can deactivate users in their org/branch
  - [ ] Cannot deactivate user from different org/branch
  - [ ] Cannot deactivate yourself
  - [ ] Deactivated users cannot login

- [ ] **PIN Management**
  - [ ] Users can change their own PIN
  - [ ] Admin can reset user PIN in their org/branch
  - [ ] Old PIN verification required for change
  - [ ] Cannot reset PIN for user in different org/branch

### Authentication Tests

- [ ] **Login**
  - [ ] Login with valid credentials succeeds
  - [ ] Login with invalid PIN fails
  - [ ] Login with inactive user fails
  - [ ] Login with inactive organisation fails
  - [ ] Login with inactive branch fails
  - [ ] JWT includes correct org/branch claims
  - [ ] Last login timestamp updated

- [ ] **Token Validation**
  - [ ] JWT validates correctly
  - [ ] JWT expires after configured time
  - [ ] Expired tokens are rejected
  - [ ] Invalid tokens are rejected
  - [ ] Token includes all required claims

- [ ] **Current User**
  - [ ] Get current user returns correct info
  - [ ] Inactive user cannot get info
  - [ ] Org/branch info included

### Access Level Tests

- [ ] **Organisation Admin**
  - [ ] Can access all branches in organisation
  - [ ] Can create users in any branch
  - [ ] Can update users in any branch
  - [ ] Cannot access other organisations

- [ ] **Branch Admin**
  - [ ] Can access only their branch
  - [ ] Can create users only in their branch
  - [ ] Can update users only in their branch
  - [ ] Cannot access other branches

- [ ] **Standard Users**
  - [ ] Cannot manage users
  - [ ] Can access only their branch data
  - [ ] Role permissions enforced
  - [ ] Cannot access other branches

## Frontend Integration

### Login Screen

```typescript
// login.component.ts
async login() {
  const request = {
    username: this.loginForm.value.username,
    pin: this.loginForm.value.pin
  };

  try {
    const response = await this.authService.login(request);
    
    // Store token
    localStorage.setItem('token', response.token);
    
    // Store user info including org/branch
    localStorage.setItem('user', JSON.stringify({
      userId: response.userId,
      username: response.username,
      role: response.role,
      organisationCode: response.organisationCode,
      organisationName: response.organisationName,
      branchCode: response.branchCode,
      branchName: response.branchName
    }));

    // Navigate to appropriate dashboard based on role
    this.router.navigate([`/${response.role.toLowerCase()}-dashboard`]);
  } catch (error) {
    this.errorMessage = 'Invalid credentials or inactive account';
  }
}
```

### User Management UI

```typescript
// users.component.ts
async loadUsers() {
  this.users = await this.userService.getAllUsers();
  
  // Display organisation and branch for each user
  this.displayUsers = this.users.map(u => ({
    ...u,
    displayText: `${u.firstName} ${u.lastName} (${u.branchName})`
  }));
}

async createUser() {
  const createDto = {
    username: this.userForm.value.username,
    password: this.userForm.value.password,
    pin: this.userForm.value.pin,
    firstName: this.userForm.value.firstName,
    lastName: this.userForm.value.lastName,
    email: this.userForm.value.email,
    role: this.userForm.value.role,
    branchCode: this.isOrgAdmin ? this.userForm.value.branchCode : null
  };

  await this.userService.createUser(createDto);
  await this.loadUsers();
}
```

## Deployment

### 1. Database Migration

```bash
# Add migration
dotnet ef migrations add AddOrganisationBranchToUsers

# Update database
dotnet ef database update
```

### 2. Seed Initial Data

```sql
-- Create default organisation
INSERT INTO Organisations (OrganisationCode, OrganisationName, IsActive)
VALUES ('ORG001', 'Main Organisation', 1);

-- Create default branch
INSERT INTO Branches (BranchCode, BranchName, OrganisationCode, IsActive)
VALUES ('BR001', 'Main Branch', 'ORG001', 1);

-- Update existing users
UPDATE Users 
SET OrganisationCode = 'ORG001',
    OrganisationName = 'Main Organisation',
    BranchCode = 'BR001',
    BranchName = 'Main Branch'
WHERE OrganisationCode IS NULL;
```

### 3. Update Existing Services

Update all services to use the multi-tenant filtering as documented in MULTI_TENANT_ISOLATION_GUIDE.md.

### 4. Test Thoroughly

Run all test scenarios before deploying to production.

---

**Complete user management with organisation and branch-level access control! Users and access levels are properly scoped to specific organisations and branches. 🔒**
