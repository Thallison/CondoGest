using Bff.Dtos.Condominium;

namespace Bff.Services.Interfaces
{
    public interface ICondominiumService
    {
        Task<List<CondominiumResponse>>GetAll(string token);
        Task<CondominiumResponse>GetById(string token, int id);
        Task<string>Create(string token, RegisterRequest data);
        Task<string>Update(string token, int id, UpdateRequest data);
        Task<string>Delete(string token, int id);
    }
}