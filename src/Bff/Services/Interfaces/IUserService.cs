using Bff.Dtos.Authenticate;
using Bff.Dtos.Users;

namespace Bff.Services.Interfaces
{
    public interface IUserService
    {
        Task<LoginResponse>Login(LoginRequest data);
        Task<List<UsersResponse>>GetAll(string token);
        Task<UsersResponse>GetById(string token, int id);
        Task<string>Create(string token, RegisterRequest data);
        Task<string>Update(string token, int id, UpdateRequest data);
    }
}