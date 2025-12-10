using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GiftCardsController : ControllerBase
    {
        private readonly IGiftCardService _giftCardService;

        public GiftCardsController(IGiftCardService giftCardService)
        {
            _giftCardService = giftCardService;
        }

        /// <summary>
        /// Issue a new gift card
        /// </summary>
        [HttpPost("issue")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<GiftCardDto>> IssueGiftCard([FromBody] CreateGiftCardDto dto)
        {
            try
            {
                var giftCard = await _giftCardService.IssueGiftCardAsync(dto);
                return Ok(giftCard);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Redeem a gift card (use during checkout)
        /// </summary>
        [HttpPost("redeem")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<GiftCardBalanceDto>> RedeemGiftCard([FromBody] RedeemGiftCardDto dto)
        {
            try
            {
                var balance = await _giftCardService.RedeemGiftCardAsync(dto);
                return Ok(balance);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Check gift card balance
        /// </summary>
        [HttpGet("balance/{cardNumber}")]
        public async Task<ActionResult<decimal>> GetBalance(string cardNumber)
        {
            try
            {
                var balance = await _giftCardService.GetBalanceAsync(cardNumber);
                return Ok(new { cardNumber, balance });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get gift card transactions
        /// </summary>
        [HttpGet("transactions/{cardNumber}")]
        public async Task<ActionResult<IEnumerable<SalesDetailsGiftsDto>>> GetTransactions(string cardNumber)
        {
            try
            {
                var transactions = await _giftCardService.GetTransactionsAsync(cardNumber);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get gift card by card number
        /// </summary>
        [HttpGet("{cardNumber}")]
        public async Task<ActionResult<GiftCardDto>> GetByCardNumber(string cardNumber)
        {
            try
            {
                var giftCard = await _giftCardService.GetByCardNumberAsync(cardNumber);
                if (giftCard == null)
                    return NotFound(new { message = "Gift card not found" });

                return Ok(giftCard);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all gift cards (filtered by tenant)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GiftCardDto>>> GetAllGiftCards()
        {
            try
            {
                var giftCards = await _giftCardService.GetAllGiftCardsAsync();
                return Ok(giftCards);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Cancel a gift card
        /// </summary>
        [HttpDelete("{cardNumber}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CancelGiftCard(string cardNumber)
        {
            try
            {
                var result = await _giftCardService.CancelGiftCardAsync(cardNumber);
                if (!result)
                    return NotFound(new { message = "Gift card not found" });

                return Ok(new { message = "Gift card cancelled successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
