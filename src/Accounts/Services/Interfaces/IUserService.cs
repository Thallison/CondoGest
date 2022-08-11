using Accounts.Dtos.Users;

namespace Accounts.Services.Interfaces
{
    public interface IUserService
    {
        Task<UsersResponse>GetById(string token, int id);
    }
}