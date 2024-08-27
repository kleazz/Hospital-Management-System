using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using HMS.Dto;
using HMS.Models;
using HMS.Data;

namespace HMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BillingController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Billing
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BillingDto>>> GetBillings()
        {
            if (_context.Billings == null)
            {
                return NotFound();
            }
            var billings = await _context.Billings
                .Include(b => b.Appointment)
                .Select(b => _mapper.Map<BillingDto>(b))
                .ToListAsync();

            return Ok(billings);
        }

        // GET: api/Billing/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BillingDto>> GetBilling(int id)
        {
            if (_context.Billings == null)
            {
                return NotFound();
            }
            var billing = await _context.Billings
                .Include(b => b.Appointment)
                .Where(b => b.Id == id)
                .Select(b => _mapper.Map<BillingDto>(b))
                .FirstOrDefaultAsync();

            if (billing == null)
            {
                return NotFound();
            }

            return Ok(billing);
        }

        // PUT: api/Billing/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBilling(int id, BillingDto billingDto)
        {
            if (id != billingDto.Id)
            {
                return BadRequest("Billing ID mismatch");
            }

            var billing = await _context.Billings.FindAsync(id);
            if (billing == null)
            {
                return NotFound("Billing not found");
            }

            _mapper.Map(billingDto, billing);
            billing.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Billing
        [HttpPost]
        public async Task<ActionResult<BillingDto>> PostBilling(BillingDto billingDto)
        {
            if (billingDto == null)
            {
                return BadRequest("Invalid billing data");
            }

            var billing = _mapper.Map<Billing>(billingDto);
            billing.CreatedAt = DateTime.UtcNow;
            billing.UpdatedAt = DateTime.UtcNow;

            _context.Billings.Add(billing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBilling", new { id = billing.Id }, _mapper.Map<BillingDto>(billing));
        }

        // DELETE: api/Billing/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBilling(int id)
        {
            var billing = await _context.Billings.FindAsync(id);
            if (billing == null)
            {
                return NotFound();
            }

            _context.Billings.Remove(billing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BillingExists(int id)
        {
            return _context.Billings.Any(e => e.Id == id);
        }
    }
}
