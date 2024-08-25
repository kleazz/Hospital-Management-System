using AutoMapper;
using HMS.Models;
using HMS.Dto;

namespace HMS.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Doctor, DoctorDto>();
            CreateMap<DoctorDto, Doctor>();

            CreateMap<Patient, PatientDto>();
            CreateMap<PatientDto, Patient>();

            CreateMap<Report, ReportDto>();
            CreateMap<ReportDto, Report>();

            CreateMap<Appointment, AppointmentDto>();
            CreateMap<AppointmentDto, Appointment>();

            CreateMap<Billing, BillingDto>();
            CreateMap<BillingDto, Billing>();
        }
    }
}