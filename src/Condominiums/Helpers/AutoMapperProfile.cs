using AutoMapper;
using Condominiums.Entities;
using Condominiums.Dtos.Condominium;

namespace Condominiums.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // RegisterRequest -> User
            CreateMap<RegisterRequest, Entities.Condominiums>();

            // UpdateRequest -> User
            CreateMap<UpdateRequest, Entities.Condominiums>()
                .ForAllMembers(x => x.Condition(
                    (src, dest, prop) =>
                    {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                        if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                        return true;
                    }
                ));
        }
    }
}
