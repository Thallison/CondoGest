using AutoMapper;
using BCrypt.Net;
using User.Authorization;
using User.Dtos.Authenticate;
using User.Dtos.Users;
using User.Entities;
using User.Helpers;

namespace User.Services.Interfaces
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Entities.User> GetAll();
        Entities.User GetById(int id);
        void Register(RegisterRequest model);
        void Update(int id, UpdateRequest model);
        void Delete(int id);
    }
}
