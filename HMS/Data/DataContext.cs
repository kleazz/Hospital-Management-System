
using HMS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HMS.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }


        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<Report> Reports { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Doctor>()
               .ToTable("Doctors");

            modelBuilder.Entity<Patient>()
                .ToTable("Patients");

            modelBuilder.Entity<Patient>()
            .HasMany(p => p.Appointments)
            .WithOne(a => a.Patient)
            .HasForeignKey(a => a.PatientId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Patient>()
           .HasMany(p => p.Reports)
           .WithOne(r => r.Patient)
           .HasForeignKey(r => r.PatientId)
           .IsRequired()
           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Doctor>()
            .HasMany(d => d.Appointments)
            .WithOne(a => a.Doctor)
            .HasForeignKey(a => a.DoctorId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Doctor>()
           .HasMany(d => d.Reports)
           .WithOne(r => r.Doctor)
           .HasForeignKey(r => r.DoctorId)
           .IsRequired()
           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Billing>()
               .HasOne(b => b.Appointment)
               .WithOne(a => a.Billing)
               .HasForeignKey<Billing>(b => b.AppointmentId);

        }
    }
}
