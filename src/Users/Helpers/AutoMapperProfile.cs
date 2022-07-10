﻿using AutoMapper;
using User.Entities;
using User.Dtos.Users;
using User.Dtos.Authenticate;

namespace User.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User -> AuthenticateResponse
            CreateMap<Entities.User, AuthenticateResponse>();

            // RegisterRequest -> User
            CreateMap<RegisterRequest, Entities.User>();

            // UpdateRequest -> User
            CreateMap<UpdateRequest, Entities.User>()
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
