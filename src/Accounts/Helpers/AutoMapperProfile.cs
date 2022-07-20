using AutoMapper;
using Accounts.Entities;
using Accounts.Dtos.Account;

namespace Accounts.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // RegisterRequest -> User
            CreateMap<RegisterRequest, Entities.Accounts>();

            // UpdateRequest -> User
            CreateMap<UpdateRequest, Entities.Accounts>()
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
