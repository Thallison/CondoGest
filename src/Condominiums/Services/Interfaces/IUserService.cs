using Condominiums.Dtos.Users;

namespace Condominiums.Services.Interfaces
{
    public interface IUserService
    {
        Task<UsersResponse>GetById(string token, int id);
    }
}