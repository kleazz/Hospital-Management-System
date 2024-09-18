using AutoMapper;
using LMS.Data;
using LMS.Dto;
using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LibriController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<LibriDto>))]
        public async Task<IActionResult> GetLibrat()
        {
            var librat = await _context.Libri.ToListAsync();
            var mappedLibrat = _mapper.Map<List<LibriDto>>(librat);

            return Ok(mappedLibrat);
        }

        [HttpGet("{libriIsbn}")]
        [ProducesResponseType(200, Type = typeof(LibriDto))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetLibri(string libriIsbn)
        {
            var libri = await _context.Libri
                .FirstOrDefaultAsync(l => l.Isbn == libriIsbn);

            if (libri == null)
                return NotFound();

            var mappedLibri = _mapper.Map<LibriDto>(libri);
            return Ok(mappedLibri);
        }

        [HttpGet("kategoria/{isbn}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<KategoriaDto>))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetKategoriaNgaLibri(string isbn)
        {
            var kategori = await _context.KategoriaELibrit
                .Where(k => k.Isbn == isbn)
                .Select(k => k.Kategoria)
                .ToListAsync();

            if (kategori == null || !kategori.Any())
                return NotFound();

            var mappedKategoria = _mapper.Map<List<KategoriaDto>>(kategori);
            return Ok(mappedKategoria);
        }

        [HttpGet("autori/{isbn}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AutoriDto>))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAutoriNgaLibri(string isbn)
        {
            var autoret = await _context.AutoriILibrit
                .Where(a => a.Isbn == isbn)
                .Select(a => a.Autori)
                .ToListAsync();

            if (autoret == null || !autoret.Any())
                return NotFound();

            var mappedAutoret = _mapper.Map<List<AutoriDto>>(autoret);
            return Ok(mappedAutoret);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateLibri([FromBody] LibriRequest libriRequest)
        {
            if (libriRequest == null || libriRequest.libri == null)
                return BadRequest();

            var existingLibri = await _context.Libri
                .FirstOrDefaultAsync(l => l.Titulli.Trim().ToUpper() == libriRequest.libri.Titulli.Trim().ToUpper());

            if (existingLibri != null)
                return StatusCode(422, "Libri already exists");

            var libriMap = _mapper.Map<Libri>(libriRequest.libri);

            await _context.Libri.AddAsync(libriMap);
            await _context.SaveChangesAsync();

            // Adding categories and authors if they exist in the request
            if (libriRequest.kategorite != null)
            {
                foreach (var kategoriaName in libriRequest.kategorite)
                {
                    var kategoriaId = await _context.Kategoria
                        .Where(k => k.EmriKategorise == kategoriaName)
                        .Select(k => k.KategoriaId)
                        .FirstOrDefaultAsync();

                    if (kategoriaId != 0)
                    {
                        var kategoriaELibrit = new KategoriaELibrit
                        {
                            Isbn = libriMap.Isbn,
                            KategoriaId = kategoriaId
                        };
                        await _context.KategoriaELibrit.AddAsync(kategoriaELibrit);
                    }
                }
            }

            if (libriRequest.autoret != null)
            {
                foreach (var autoriFullName in libriRequest.autoret)
                {
                    var parts = autoriFullName.Split(' ');
                    if (parts.Length == 2)
                    {
                        var autoriId = await _context.Autori
                            .Where(a => a.Emri == parts[0] && a.Mbiemri == parts[1])
                            .Select(a => a.AutoriId)
                            .FirstOrDefaultAsync();

                        if (autoriId != 0)
                        {
                            var autoriILibrit = new AutoriILibrit
                            {
                                Isbn = libriMap.Isbn,
                                AutoriId = autoriId
                            };
                            await _context.AutoriILibrit.AddAsync(autoriILibrit);
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return StatusCode(201, "Successfully created");
        }

        [HttpPut("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateLibri(string libriIsbn, [FromBody] LibriDto updatedLibri)
        {
            if (updatedLibri == null || libriIsbn != updatedLibri.isbn)
                return BadRequest();

            var existingLibri = await _context.Libri
                .FirstOrDefaultAsync(l => l.Isbn == libriIsbn);

            if (existingLibri == null)
                return NotFound();

            _mapper.Map(updatedLibri, existingLibri);

            _context.Libri.Update(existingLibri);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteLibri(string libriIsbn)
        {
            var libriToDelete = await _context.Libri
                .FirstOrDefaultAsync(l => l.Isbn == libriIsbn);

            if (libriToDelete == null)
                return NotFound();

            _context.Libri.Remove(libriToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
