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
    public class DoctorController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DoctorController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorDto>>> GetDoctors()
        {
            if (_context.Doctors == null)
            {
                return NotFound();
            }

            var doctors = await _context.Doctors.ToListAsync();
            var doctorDtos = _mapper.Map<IEnumerable<DoctorDto>>(doctors);
            return Ok(doctorDtos);
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorDto>> GetDoctor(string id)
        {
            if (_context.Doctors == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            var doctorDto = _mapper.Map<DoctorDto>(doctor);
            return Ok(doctorDto);
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(string id, DoctorDto doctorDto)
        {
            if (id != doctorDto.Id)
            {
                return BadRequest("Doctor ID mismatch");
            }

            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            _mapper.Map(doctorDto, doctor);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
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

        // POST: api/Doctors
        [HttpPost]
        public async Task<ActionResult<DoctorDto>> PostDoctor(DoctorDto doctorDto)
        {
            if (_context.Doctors == null)
            {
                return Problem("Entity set 'DataContext.Doctors' is null.");
            }

            var doctor = _mapper.Map<Doctor>(doctorDto);
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctor", new { id = doctor.Id }, _mapper.Map<DoctorDto>(doctor));
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(string id)
        {
            if (_context.Doctors == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(string id)
        {
            return _context.Doctors.Any(e => e.Id == id);
        }
    }
}
