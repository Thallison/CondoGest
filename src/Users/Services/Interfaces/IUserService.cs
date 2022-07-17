using AutoMapper;
using BCrypt.Net;
using Users.Authorization;
using Users.Dtos.Authenticate;
using Users.Dtos.Users;
using Users.Entities;
using Users.Helpers;

namespace Users.Services.Interfaces
{
    public interface IUserService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);
        public IEnumerable<Entities.User> GetAll();
        public Entities.User GetById(int id);
        Task Create(RegisterRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
    }
}
