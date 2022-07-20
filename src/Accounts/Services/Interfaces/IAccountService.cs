using System.Linq;
using Accounts.Dtos.Account;
using Accounts.Entities;

namespace Accounts.Services.Interfaces
{
    public interface IAccountService
    {
        public IEnumerable<Entities.Accounts> GetAll();
        public Entities.Accounts GetById(int id);
        Task Create(RegisterRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
    }
}
