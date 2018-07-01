using System.Linq;
using AutoMapper;
using DTG.API.Dtos;
using DTG.API.Models;

namespace DTG.API.Helpers {
    public class AutoMapperProfiles: Profile {
        public AutoMapperProfiles() {
            
             // API Data Transfer Object to Domain
            CreateMap < User, UserForListDto > ()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap < User, UserForDetailDto > ()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<SaveVehicleDto, Vehicle>()
              .ForMember(v => v.Id, opt => opt.Ignore())
              .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
              .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
              .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
              .ForMember(v => v.Features, opt => opt.Ignore())
              .AfterMap((vr, v) => {
                // Remove unselected features
                var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                foreach (var f in removedFeatures)
                  v.Features.Remove(f);
                    // Add new features
                var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });   
                foreach (var f in addedFeatures)
                    v.Features.Add(f);
            });


            CreateMap < UserForUpdateDto, User > ();
            CreateMap < PhotoForCreationDto, Photo > ();
            CreateMap < UserForRegisterDto, User > ();
            CreateMap < MessageForCreationDto, Message > ().ReverseMap();
            

            // Domain to API Data Transfer Object
            CreateMap < Make, MakeDto > ();
            CreateMap<Make, KeyValuePairDto>();
            CreateMap < Model, KeyValuePairDto > ();
            CreateMap < Feature, KeyValuePairDto > ();
            CreateMap < Photo, PhotoForDetailDto > ();
            CreateMap < Contact, ContactForListDto > ().ReverseMap();
            CreateMap < Photo, PhotoForReturnDto > ();
            CreateMap < Message, MessageToReturnDto > ()
                .ForMember(m => m.SenderPhotoUrl, opt =>
                    opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt =>
                    opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Vehicle, SaveVehicleDto>()
              .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone } ))
              .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            CreateMap<Vehicle, VehicleDto>()
              .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
              .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone } ))
              .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairDto { Id = vf.Feature.Id, Name = vf.Feature.Name })));


        }
    }
}