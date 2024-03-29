﻿using Users.Dtos.Authenticate;
using Users.Dtos.Users;

namespace Users.Services.Interfaces
{
    public interface IUserService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);
        public IEnumerable<Entities.User> GetAll();
        public IEnumerable<Entities.User> GetUsersByCondominium(int condominiumsId);
        public Entities.User GetById(int id);
        Task Create(RegisterRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
        public IEnumerable<Entities.User> GetUsersById(int id);
    }
}