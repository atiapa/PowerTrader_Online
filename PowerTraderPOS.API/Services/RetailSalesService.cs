using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Services
{
    /// <summary>
    /// Service for retail sales operations including hold orders
    /// </summary>
    public class RetailSalesService : BaseService, IRetailSalesService
    {
        public RetailSalesService(AppDbContext context, IUserContextService userContext)
            : base(context, userContext)
        {
        }

        /// <summary>
        /// Hold current order for later completion
        /// </summary>
        public async Task<CashSalesPendingDto> HoldOrderAsync(CreateCashSalesPendingDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();

            // Generate unique hold reference
            var holdReference = await GenerateHoldReferenceAsync();

            var pendingSale = new CashSalesPending
            {
                HoldReference = holdReference,
                CustomerId = dto.CustomerId,
                CustomerName = dto.CustomerName,
                TotalAmount = dto.TotalAmount,
                Items = dto.Items,
                CashierUserId = userId,
                CashierName = _userContext.GetUserId(), // In real app, get user name from user service
                HoldDateTime = DateTime.Now,
                ExpiryDateTime = DateTime.Now.AddHours(dto.ExpiryHours),
                Status = "Pending",
                Notes = dto.Notes,
                CreatedDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.CashSalesPending.Add(pendingSale);
            await _context.SaveChangesAsync();

            return MapToDto(pendingSale);
        }

        /// <summary>
        /// Get all pending sales for the current tenant
        /// </summary>
        public async Task<IEnumerable<CashSalesPendingDto>> GetAllPendingSalesAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.CashSalesPending
                .Where(p => p.OrganisationCode == orgCode && p.Status == "Pending");

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var pendingSales = await query
                .OrderByDescending(p => p.HoldDateTime)
                .ToListAsync();

            return pendingSales.Select(MapToDto);
        }

        /// <summary>
        /// Get pending sales for the current cashier
        /// </summary>
        public async Task<IEnumerable<CashSalesPendingDto>> GetCashierPendingSalesAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();

            var pendingSales = await _context.CashSalesPending
                .Where(p => p.OrganisationCode == orgCode 
                         && p.Branchcode == branchCode
                         && p.CashierUserId == userId
                         && p.Status == "Pending")
                .OrderByDescending(p => p.HoldDateTime)
                .ToListAsync();

            return pendingSales.Select(MapToDto);
        }

        /// <summary>
        /// Get a specific pending sale by ID
        /// </summary>
        public async Task<CashSalesPendingDto?> GetPendingSaleByIdAsync(int pendingId)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.CashSalesPending
                .Where(p => p.PendingId == pendingId && p.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var pendingSale = await query.FirstOrDefaultAsync();

            return pendingSale == null ? null : MapToDto(pendingSale);
        }

        /// <summary>
        /// Get a pending sale by hold reference
        /// </summary>
        public async Task<CashSalesPendingDto?> GetPendingSaleByReferenceAsync(string reference)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.CashSalesPending
                .Where(p => p.HoldReference == reference && p.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var pendingSale = await query.FirstOrDefaultAsync();

            return pendingSale == null ? null : MapToDto(pendingSale);
        }

        /// <summary>
        /// Retrieve a held order to resume transaction
        /// </summary>
        public async Task<RetrievePendingSaleDto?> RetrievePendingOrderAsync(int pendingId)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.CashSalesPending
                .Where(p => p.PendingId == pendingId && p.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var pendingSale = await query.FirstOrDefaultAsync();

            if (pendingSale == null)
                return null;

            // Validate status
            if (pendingSale.Status != "Pending")
                throw new InvalidOperationException($"Cannot retrieve order with status: {pendingSale.Status}");

            // Validate expiration
            if (pendingSale.ExpiryDateTime.HasValue && pendingSale.ExpiryDateTime.Value < DateTime.Now)
                throw new InvalidOperationException("This order has expired and cannot be retrieved");

            // Update status
            pendingSale.Status = "Retrieved";
            pendingSale.RetrievedDateTime = DateTime.Now;
            pendingSale.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return new RetrievePendingSaleDto
            {
                PendingId = pendingSale.PendingId,
                HoldReference = pendingSale.HoldReference,
                CustomerId = pendingSale.CustomerId,
                CustomerName = pendingSale.CustomerName,
                TotalAmount = pendingSale.TotalAmount,
                Items = pendingSale.Items,
                HoldDateTime = pendingSale.HoldDateTime,
                Notes = pendingSale.Notes
            };
        }

        /// <summary>
        /// Cancel a held order
        /// </summary>
        public async Task<bool> CancelPendingOrderAsync(int pendingId)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.CashSalesPending
                .Where(p => p.PendingId == pendingId && p.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var pendingSale = await query.FirstOrDefaultAsync();

            if (pendingSale == null)
                return false;

            pendingSale.Status = "Cancelled";
            pendingSale.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Complete a retail sale (placeholder for future implementation with inventory and accounting integration)
        /// </summary>
        public async Task<bool> CompleteSaleAsync()
        {
            // TODO: Implement complete sale with:
            // - Inventory reduction (InventoryService)
            // - Gift card redemption (GiftCardService)
            // - Save to Sales_Details_Temp with Store="Retail"
            // - Post to Accounts_Ledger (AccountingService)
            // - Generate receipt

            await Task.CompletedTask;
            return true;
        }

        /// <summary>
        /// Generate a unique hold reference number
        /// </summary>
        private async Task<string> GenerateHoldReferenceAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var random = new Random();
            string reference;
            bool exists;

            do
            {
                var number = random.Next(100000000, 999999999);
                reference = $"HOLD{number}";

                exists = await _context.CashSalesPending
                    .AnyAsync(g => g.HoldReference == reference && g.OrganisationCode == orgCode);

            } while (exists);

            return reference;
        }

        /// <summary>
        /// Map CashSalesPending entity to DTO
        /// </summary>
        private static CashSalesPendingDto MapToDto(CashSalesPending entity)
        {
            return new CashSalesPendingDto
            {
                PendingId = entity.PendingId,
                HoldReference = entity.HoldReference,
                CustomerId = entity.CustomerId,
                CustomerName = entity.CustomerName,
                TotalAmount = entity.TotalAmount,
                Items = entity.Items,
                CashierUserId = entity.CashierUserId,
                CashierName = entity.CashierName,
                HoldDateTime = entity.HoldDateTime,
                RetrievedDateTime = entity.RetrievedDateTime,
                ExpiryDateTime = entity.ExpiryDateTime,
                Status = entity.Status,
                Notes = entity.Notes,
                OrganisationCode = entity.OrganisationCode,
                Branchcode = entity.Branchcode
            };
        }
    }
}
