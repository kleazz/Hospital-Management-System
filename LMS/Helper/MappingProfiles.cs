using AutoMapper;
using HMS.Models;
using HMS.Dto;
using BibliotekaMS.Dto;
using BibliotekaMS.Models;

namespace HMS.Helper
{
    public class MappingProfiles : Profile
    {
            public MappingProfiles()
            {
                CreateMap<Libri, LibriDto>();
                CreateMap<LibriDto, Libri>();

                CreateMap<Kategoria, KategoriaDto>();
                CreateMap<KategoriaDto, Kategoria>();

                CreateMap<Autori, AutoriDto>();
                CreateMap<AutoriDto, Autori>();

                CreateMap<RezervimiDto, Rezervimi>();
                CreateMap<Rezervimi, RezervimiDto>();

                CreateMap<Huazimi, HuazimiDto>();
                CreateMap<HuazimiDto, Huazimi>();

                CreateMap<Review, ReviewDto>();
                CreateMap<ReviewDto, Review>();

                CreateMap<Huazimi, HuazimiDto>();
                CreateMap<HuazimiDto, Huazimi>();
        }
    }
}