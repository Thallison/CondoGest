using Bff.Dtos.Account;

namespace Bff.Services.Interfaces
{
    public interface IAccountService
    {
        Task<List<AccountResponse>>GetAll(string token);
        Task<AccountResponse>GetById(string token, int id);
        Task<string>Create(string token, RegisterRequest data);
        Task<string>Update(string token, int id, UpdateRequest data);
        Task<string>Delete(string token, int id);
    }
}