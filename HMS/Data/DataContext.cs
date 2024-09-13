
using BibliotekaMS.Models;
using HMS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace HMS.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Kategoria> Kategoria { get; set; }
        public DbSet<Libri> Libri { get; set; }
        public DbSet<KategoriaELibrit> KategoriaELibrit { get; set; }
        public DbSet<Autori> Autori { get; set; }

        public DbSet<AutoriILibrit> AutoriILibrit { get; set; }
        public DbSet<Rezervimi> Rezervimi { get; set; }

        public DbSet<Huazimi> Huazimi { get; set; }

        public DbSet<Review> Review { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Libri>()
            .HasKey(l => l.Isbn);
            modelBuilder.Entity<KategoriaELibrit>()
                .HasKey(pc => new { pc.Isbn, pc.KategoriaId });
            modelBuilder.Entity<KategoriaELibrit>()
                .HasOne(p => p.Libri)
                .WithMany(pc => pc.KategoriaELibrit)
                .HasForeignKey(p => p.Isbn);
            modelBuilder.Entity<KategoriaELibrit>()
               .HasOne(p => p.Kategoria)
               .WithMany(pc => pc.KategoriaELibrit)
               .HasForeignKey(c => c.KategoriaId);

            modelBuilder.Entity<AutoriILibrit>()
                .HasKey(al => new { al.Isbn, al.AutoriId });
            modelBuilder.Entity<AutoriILibrit>()
                .HasOne(l => l.Libri)
                .WithMany(al => al.AutoriILibrit)
                .HasForeignKey(l => l.Isbn);
            modelBuilder.Entity<AutoriILibrit>()
                .HasOne(l => l.Autori)
                .WithMany(al => al.AutoriILibrit)
                .HasForeignKey(l => l.AutoriId);

            modelBuilder.Entity<Libri>()
            .HasMany(e => e.Rezervimet)
            .WithOne(e => e.Libri)
            .HasForeignKey(e => e.Isbn)
            .IsRequired();

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Rezervimet)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey(r => r.Id)
                .IsRequired();

            modelBuilder.Entity<Libri>()
           .HasMany(e => e.Huazimet)
           .WithOne(e => e.Libri)
           .HasForeignKey(e => e.Isbn)
           .IsRequired();

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Huazimet)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey(r => r.Id)
                .IsRequired();

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Reviews)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey(r => r.Id)
                .IsRequired();

            modelBuilder.Entity<Libri>()
                .HasMany(e => e.Reviews)
                .WithOne(e => e.Libri)
                .HasForeignKey(r => r.Isbn)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Ndertesa>()
                .HasMany(e => e.Ashensoret)
                .WithOne(e => e.Ndertesa)
                .HasForeignKey(e => e.NdertesaId)
                .HasPrincipalKey(e => e.NdertesaId);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Planet>()
                .HasMany(e => e.Satellites)
                .WithOne(e => e.Planet)
                .HasForeignKey(e => e.PlanetId)
                .HasPrincipalKey(e => e.PlanetId);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Team>()
                .HasMany(e => e.Players)
                .WithOne(e => e.Team)
                .HasForeignKey(e => e.TeamId)
                .HasPrincipalKey(e => e.TeamId);

        }
    }
}
