using System.Linq;
using AutoMapper;
using DTG.API.Dtos;
using DTG.API.Models;

namespace DTG.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => { 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
                

            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => { 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotoForDetailDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
            .ForMember(m => m.SenderPhotoUrl, opt => 
            opt.MapFrom( u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))

               .ForMember(m => m.RecipientPhotoUrl, opt => 
            opt.MapFrom( u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

 
        }
    }
}