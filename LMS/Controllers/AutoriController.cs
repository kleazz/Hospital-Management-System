using AutoMapper;
using LMS.Data;
using LMS.Dto;
using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoriController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AutoriController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AutoriDto>))]
        public async Task<IActionResult> GetAutoret()
        {
            var autoret = await _context.Autori.ToListAsync();
            var autoretDto = _mapper.Map<List<AutoriDto>>(autoret);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autoretDto);
        }

        [HttpGet("{autoriId}")]
        [ProducesResponseType(200, Type = typeof(AutoriDto))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAutori(int autoriId)
        {
            var autori = await _context.Autori.FindAsync(autoriId);
            if (autori == null)
                return NotFound();

            var autoriDto = _mapper.Map<AutoriDto>(autori);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autoriDto);
        }

        [HttpGet("libri/{autoriId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<LibriDto>))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetLibriNgaAutori(int autoriId)
        {
            var autoriExists = await _context.Autori.AnyAsync(a => a.AutoriId == autoriId);
            if (!autoriExists)
                return NotFound();

            var librat = await _context.AutoriILibrit
                            .Where(al => al.AutoriId == autoriId)
                            .Select(al => al.Libri)
                            .ToListAsync();
            var libriDto = _mapper.Map<List<LibriDto>>(librat);

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(libriDto);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateAutori([FromBody] AutoriDto autoriCreate)
        {
            if (autoriCreate == null)
                return BadRequest(ModelState);

            var autoriExists = await _context.Autori
                .AnyAsync(a => a.Emri.Trim().ToUpper() == autoriCreate.Emri.Trim().ToUpper());

            if (autoriExists)
            {
                ModelState.AddModelError("", "Autori already exists");
                return StatusCode(422, ModelState);
            }

            var autori = _mapper.Map<Autori>(autoriCreate);
            await _context.Autori.AddAsync(autori);

            if (await _context.SaveChangesAsync() <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok(autori);
        }

        [HttpPut("{autoriId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateAutori(int autoriId, [FromBody] AutoriDto updatedAutori)
        {
            if (updatedAutori == null || autoriId != updatedAutori.AutoriId)
                return BadRequest(ModelState);

            var autoriExists = await _context.Autori.AnyAsync(a => a.AutoriId == autoriId);
            if (!autoriExists)
                return NotFound();

            var autori = _mapper.Map<Autori>(updatedAutori);
            _context.Autori.Update(autori);

            if (await _context.SaveChangesAsync() <= 0)
            {
                ModelState.AddModelError("", "Something went wrong updating autori");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{autoriId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteAutori(int autoriId)
        {
            var autori = await _context.Autori.FindAsync(autoriId);
            if (autori == null)
                return NotFound();

            _context.Autori.Remove(autori);

            if (await _context.SaveChangesAsync() <= 0)
            {
                ModelState.AddModelError("", "Something went wrong deleting autori");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
