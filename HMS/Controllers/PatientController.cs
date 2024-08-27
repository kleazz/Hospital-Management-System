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
    public class PatientController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PatientController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatients()
        {
            if (_context.Patients == null)
            {
                return NotFound();
            }

            var patients = await _context.Patients
                .Include(p => p.Appointments)
                .Include(p => p.Reports)
                .ToListAsync();

            var patientDtos = _mapper.Map<List<PatientDto>>(patients);
            return Ok(patientDtos);
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetPatient(string id)
        {
            if (_context.Patients == null)
            {
                return NotFound();
            }

            var patient = await _context.Patients
                .Include(p => p.Appointments)
                .Include(p => p.Reports)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null)
            {
                return NotFound();
            }

            var patientDto = _mapper.Map<PatientDto>(patient);
            return Ok(patientDto);
        }

        // PUT: api/Patients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(string id, [FromBody] PatientDto patientDto)
        {
            if (id != patientDto.Id)
            {
                return BadRequest("Patient ID mismatch");
            }

            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _mapper.Map(patientDto, patient);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST: api/Patients
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(PatientDto patientDto)
        {
            if (patientDto == null)
            {
                return BadRequest("Invalid patient data");
            }

            var patient = _mapper.Map<Patient>(patientDto);

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(string id)
        {
            if (_context.Patients == null)
            {
                return NotFound();
            }

            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(string id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }
    }
}
