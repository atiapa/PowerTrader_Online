using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IGiftCardService
    {
        /// <summary>
        /// Issue a new gift card
        /// </summary>
        Task<GiftCardDto> IssueGiftCardAsync(CreateGiftCardDto dto);

        /// <summary>
        /// Redeem a gift card (deduct amount from balance)
        /// </summary>
        Task<GiftCardBalanceDto> RedeemGiftCardAsync(RedeemGiftCardDto dto);

        /// <summary>
        /// Get gift card balance
        /// </summary>
        Task<decimal> GetBalanceAsync(string cardNumber);

        /// <summary>
        /// Get gift card transactions (sales using this gift card)
        /// </summary>
        Task<IEnumerable<SalesDetailsGiftsDto>> GetTransactionsAsync(string cardNumber);

        /// <summary>
        /// Get gift card by card number
        /// </summary>
        Task<GiftCardDto?> GetByCardNumberAsync(string cardNumber);

        /// <summary>
        /// Get all gift cards
        /// </summary>
        Task<IEnumerable<GiftCardDto>> GetAllGiftCardsAsync();

        /// <summary>
        /// Cancel a gift card
        /// </summary>
        Task<bool> CancelGiftCardAsync(string cardNumber);
    }
}
