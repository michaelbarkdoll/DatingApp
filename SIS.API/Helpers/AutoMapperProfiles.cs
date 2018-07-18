using System.Linq;
using AutoMapper;
using SIS.API.Dtos;
using SIS.API.Models;

namespace SIS.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotosForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();

            // <Source type on left, Destination type on the right>
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}