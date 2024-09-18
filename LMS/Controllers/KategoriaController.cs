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
    public class KategoriaController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public KategoriaController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Kategoria
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<KategoriaDto>))]
        public async Task<IActionResult> GetKategorite()
        {
            var kategorite = await _context.Kategoria.ToListAsync();
            var kategoriteDto = _mapper.Map<List<KategoriaDto>>(kategorite);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(kategoriteDto);
        }

        // GET: api/Kategoria/5
        [HttpGet("{kategoriaId}")]
        [ProducesResponseType(200, Type = typeof(KategoriaDto))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetKategoria(int kategoriaId)
        {
            var kategoria = await _context.Kategoria.FindAsync(kategoriaId);

            if (kategoria == null)
                return NotFound();

            var kategoriaDto = _mapper.Map<KategoriaDto>(kategoria);

            return Ok(kategoriaDto);
        }

        // GET: api/Kategoria/libri/5
        [HttpGet("libri/{kategoriaId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<LibriDto>))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetLibriNgaKategoria(int kategoriaId)
        {
            var exists = await _context.Kategoria.AnyAsync(k => k.KategoriaId == kategoriaId);

            if (!exists)
                return NotFound();

            var librat = await _context.KategoriaELibrit
                .Where(ke => ke.KategoriaId == kategoriaId)
                .Select(ke => ke.Libri)
                .ToListAsync();

            var libratDto = _mapper.Map<List<LibriDto>>(librat);

            return Ok(libratDto);
        }

        // POST: api/Kategoria
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateKategoria([FromBody] KategoriaDto kategoriaCreate)
        {
            if (kategoriaCreate == null)
                return BadRequest(ModelState);

            var existingKategoria = await _context.Kategoria
                .AnyAsync(k => k.EmriKategorise.Trim().ToUpper() == kategoriaCreate.EmriKategorise.Trim().ToUpper());

            if (existingKategoria)
            {
                ModelState.AddModelError("", "Kategoria already exists");
                return StatusCode(422, ModelState);
            }

            var kategoria = _mapper.Map<Kategoria>(kategoriaCreate);

            await _context.Kategoria.AddAsync(kategoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKategoria), new { kategoriaId = kategoria.KategoriaId }, kategoria);
        }

        // PUT: api/Kategoria/5
        [HttpPut("{kategoriaId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateKategoria(int kategoriaId, [FromBody] KategoriaDto updatedKategoria)
        {
            if (updatedKategoria == null || kategoriaId != updatedKategoria.KategoriaId)
                return BadRequest(ModelState);

            var kategoria = await _context.Kategoria.FindAsync(kategoriaId);

            if (kategoria == null)
                return NotFound();

            _mapper.Map(updatedKategoria, kategoria);
            _context.Kategoria.Update(kategoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Kategoria/5
        [HttpDelete("{kategoriaId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteKategoria(int kategoriaId)
        {
            var kategoria = await _context.Kategoria.FindAsync(kategoriaId);

            if (kategoria == null)
                return NotFound();

            _context.Kategoria.Remove(kategoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
