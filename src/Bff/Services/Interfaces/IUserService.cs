using Bff.Dtos.Authenticate;

namespace Bff.Services.Interfaces
{
    public interface IUserService
    {
        Task<LoginResponse>Login(LoginRequest data);
    }
}