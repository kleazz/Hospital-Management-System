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
    public class ReportController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ReportController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Reports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportDto>>> GetReports()
        {
            if (_context.Reports == null)
            {
                return NotFound();
            }

            var reports = await _context.Reports
                .Include(r => r.Patient)
                .Include(r => r.Doctor)
                .ToListAsync();

            var reportDtos = _mapper.Map<IEnumerable<ReportDto>>(reports);

            return Ok(reportDtos);
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReportDto>> GetReport(int id)
        {
            if (_context.Reports == null)
            {
                return NotFound();
            }

            var report = await _context.Reports
                .Include(r => r.Patient)
                .Include(r => r.Doctor)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (report == null)
            {
                return NotFound();
            }

            var reportDto = _mapper.Map<ReportDto>(report);

            return Ok(reportDto);
        }

        // PUT: api/Reports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport(int id, ReportDto reportDto)
        {
            if (id != reportDto.Id)
            {
                return BadRequest("Report ID mismatch");
            }

            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound("Report not found");
            }

            _mapper.Map(reportDto, report);
            report.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // POST: api/Reports
        [HttpPost]
        public async Task<ActionResult<ReportDto>> PostReport(ReportDto reportDto)
        {
            if (reportDto == null)
            {
                return BadRequest("Invalid report data");
            }

            var report = _mapper.Map<Report>(reportDto);
            report.CreatedAt = DateTime.UtcNow;
            report.UpdatedAt = DateTime.UtcNow;

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReport", new { id = report.Id }, _mapper.Map<ReportDto>(report));
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReportExists(int id)
        {
            return _context.Reports.Any(e => e.Id == id);
        }
    }
}
