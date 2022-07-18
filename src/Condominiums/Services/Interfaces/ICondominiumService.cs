using System.Linq;
using Condominiums.Dtos.Condominium;
using Condominiums.Entities;

namespace Condominiums.Services.Interfaces
{
    public interface ICondominiumService
    {
        public IEnumerable<Entities.Condominiums> GetAll();
        public Entities.Condominiums GetById(int id);
        Task Create(RegisterRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
    }
}
