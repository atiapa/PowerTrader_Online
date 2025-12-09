using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class GiftCardService : BaseService, IGiftCardService
    {
        public GiftCardService(AppDbContext context, IUserContextService userContext)
            : base(context, userContext)
        {
        }

        public async Task<GiftCardDto> IssueGiftCardAsync(CreateGiftCardDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();

            // Generate unique card number
            var cardNumber = await GenerateCardNumberAsync();

            var giftCard = new GiftCards
            {
                CardNumber = cardNumber,
                InitialBalance = dto.InitialBalance,
                CurrentBalance = dto.InitialBalance,
                IssueDate = DateTime.Now,
                ExpiryDate = dto.ExpiryDate,
                Status = "Active",
                IssuedBy = userId,
                CustomerID = dto.CustomerID,
                CustomerName = dto.CustomerName,
                Notes = dto.Notes,
                CreatedDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.Set<GiftCards>().Add(giftCard);
            await _context.SaveChangesAsync();

            return MapToDto(giftCard);
        }

        public async Task<GiftCardBalanceDto> RedeemGiftCardAsync(RedeemGiftCardDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            // Get gift card with tenant filter
            var giftCard = await _context.Set<GiftCards>()
                .FirstOrDefaultAsync(g => g.CardNumber == dto.CardNumber 
                    && g.OrganisationCode == orgCode);

            if (giftCard == null)
                throw new Exception("Gift card not found");

            if (giftCard.Status != "Active")
                throw new Exception($"Gift card is {giftCard.Status}");

            if (giftCard.ExpiryDate.HasValue && giftCard.ExpiryDate < DateTime.Now)
            {
                giftCard.Status = "Expired";
                await _context.SaveChangesAsync();
                throw new Exception("Gift card has expired");
            }

            if (giftCard.CurrentBalance < dto.Amount)
                throw new Exception($"Insufficient balance. Available: {giftCard.CurrentBalance}");

            // Deduct amount
            giftCard.CurrentBalance -= dto.Amount;
            giftCard.ModifiedDate = DateTime.Now;

            if (giftCard.CurrentBalance == 0)
            {
                giftCard.Status = "Redeemed";
            }

            // Create transaction record in Sales_Details_Gifts
            var transaction = new SalesDetailsGifts
            {
                InvoiceNr = dto.InvoiceNr,
                EntryDate = DateTime.Now,
                Amountpaid = dto.Amount,
                Remarks = dto.Remarks ?? $"Gift card redemption: {dto.CardNumber}",
                SalesType = "GiftCard",
                Current_Balance = giftCard.CurrentBalance,
                Previous_Balance = giftCard.CurrentBalance + dto.Amount,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.Set<SalesDetailsGifts>().Add(transaction);
            await _context.SaveChangesAsync();

            return new GiftCardBalanceDto
            {
                CardNumber = giftCard.CardNumber,
                CurrentBalance = giftCard.CurrentBalance,
                Status = giftCard.Status,
                ExpiryDate = giftCard.ExpiryDate
            };
        }

        public async Task<decimal> GetBalanceAsync(string cardNumber)
        {
            var orgCode = _userContext.GetOrganisationCode();

            var giftCard = await _context.Set<GiftCards>()
                .FirstOrDefaultAsync(g => g.CardNumber == cardNumber 
                    && g.OrganisationCode == orgCode);

            if (giftCard == null)
                throw new Exception("Gift card not found");

            return giftCard.CurrentBalance;
        }

        public async Task<IEnumerable<SalesDetailsGiftsDto>> GetTransactionsAsync(string cardNumber)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            var transactions = await _context.Set<SalesDetailsGifts>()
                .Where(t => t.Remarks != null && t.Remarks.Contains(cardNumber)
                    && t.OrganisationCode == orgCode
                    && t.Branchcode == branchCode)
                .OrderByDescending(t => t.EntryDate)
                .Select(t => new SalesDetailsGiftsDto
                {
                    RefNo = t.RefNo,
                    InvoiceNr = t.InvoiceNr,
                    ProductID = t.ProductID,
                    ProductName = t.ProductName,
                    BatchNo = t.BatchNo,
                    HI_Unitprice = t.HI_Unitprice,
                    UnitPrice = t.UnitPrice,
                    Quantity = t.Quantity,
                    Cost = t.Cost,
                    Discount = t.Discount,
                    ExtendedPrice = t.ExtendedPrice,
                    EntryID = t.EntryID,
                    CustomerAccountNr = t.CustomerAccountNr,
                    CustomerID = t.CustomerID,
                    CustomerName = t.CustomerName,
                    EntryDate = t.EntryDate,
                    Remarks = t.Remarks,
                    PrevStock = t.PrevStock,
                    PrevReorder = t.PrevReorder,
                    CostPrice = t.CostPrice,
                    ProfitOrLoss = t.ProfitOrLoss,
                    Amountpaid = t.Amountpaid,
                    Change_Balance = t.Change_Balance,
                    Tax = t.Tax,
                    Attendant = t.Attendant,
                    TillName = t.TillName,
                    Time = t.Time,
                    Session = t.Session,
                    Barcodenr = t.Barcodenr,
                    SalesType = t.SalesType,
                    AmountInwords = t.AmountInwords,
                    Ordernr = t.Ordernr,
                    qtyremaining = t.qtyremaining,
                    qtyreturned = t.qtyreturned,
                    Previous_Balance = t.Previous_Balance,
                    Current_Balance = t.Current_Balance,
                    Currency = t.Currency,
                    OrganisationCode = t.OrganisationCode,
                    Branchcode = t.Branchcode
                })
                .ToListAsync();

            return transactions;
        }

        public async Task<GiftCardDto?> GetByCardNumberAsync(string cardNumber)
        {
            var orgCode = _userContext.GetOrganisationCode();

            var giftCard = await _context.Set<GiftCards>()
                .FirstOrDefaultAsync(g => g.CardNumber == cardNumber 
                    && g.OrganisationCode == orgCode);

            return giftCard == null ? null : MapToDto(giftCard);
        }

        public async Task<IEnumerable<GiftCardDto>> GetAllGiftCardsAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.Set<GiftCards>()
                .Where(g => g.OrganisationCode == orgCode);

            // Non-admin users see only their branch
            if (!isAdmin)
            {
                query = query.Where(g => g.Branchcode == branchCode);
            }

            var giftCards = await query
                .OrderByDescending(g => g.CreatedDate)
                .Select(g => MapToDto(g))
                .ToListAsync();

            return giftCards;
        }

        public async Task<bool> CancelGiftCardAsync(string cardNumber)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            var giftCard = await _context.Set<GiftCards>()
                .FirstOrDefaultAsync(g => g.CardNumber == cardNumber 
                    && g.OrganisationCode == orgCode
                    && g.Branchcode == branchCode);

            if (giftCard == null)
                return false;

            giftCard.Status = "Cancelled";
            giftCard.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        // Helper methods
        private async Task<string> GenerateCardNumberAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var prefix = "GC";
            string cardNumber;
            
            do
            {
                var randomPart = new Random().Next(100000000, 999999999);
                cardNumber = $"{prefix}{randomPart}";
            }
            while (await _context.Set<GiftCards>()
                .AnyAsync(g => g.CardNumber == cardNumber && g.OrganisationCode == orgCode));

            return cardNumber;
        }

        private GiftCardDto MapToDto(GiftCards giftCard)
        {
            return new GiftCardDto
            {
                GiftCardId = giftCard.GiftCardId,
                CardNumber = giftCard.CardNumber,
                InitialBalance = giftCard.InitialBalance,
                CurrentBalance = giftCard.CurrentBalance,
                IssueDate = giftCard.IssueDate,
                ExpiryDate = giftCard.ExpiryDate,
                Status = giftCard.Status,
                IssuedBy = giftCard.IssuedBy,
                CustomerID = giftCard.CustomerID,
                CustomerName = giftCard.CustomerName,
                Notes = giftCard.Notes,
                CreatedDate = giftCard.CreatedDate,
                ModifiedDate = giftCard.ModifiedDate,
                OrganisationCode = giftCard.OrganisationCode,
                Branchcode = giftCard.Branchcode
            };
        }
    }
}
