using AutoMapper;
using Condominiums.Dtos.Condominium;
using Condominiums.Helpers;
using Condominiums.Services.Interfaces;

namespace Condominiums.Services
{
    public class CondominiumService : ICondominiumService
    {
        private ApplicationDbContext _context;        
        private readonly IMapper _mapper;

        public CondominiumService(
            ApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Entities.Condominiums> GetAll()
        {
            return _context.Condominiums;
        }

        public Entities.Condominiums GetById(int id)
        {
            return getCondominium(id);
        }

        public async Task Create(RegisterRequest model)
        {
            // validate
            if (_context.Condominiums.Any(x => x.Cnpj == model.Cnpj))
            {
                throw new AppException("CNPJ '" + model.Cnpj + "' is already Exists");
            }

            // map model to new user object
            var newCondominium = _mapper.Map<Entities.Condominiums>(model);
            newCondominium.CreatedAt = DateTime.Now;

            // save user
            _context.Condominiums.Add(newCondominium);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, UpdateRequest model)
        {
            var UpdateCondominium = getCondominium(id);
            UpdateCondominium.UpdatedAt = DateTime.Now;
            
            // copy model to user and save
            _mapper.Map(model, UpdateCondominium);
            _context.Condominiums.Update(UpdateCondominium);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var condominium = getCondominium(id);
            _context.Condominiums.Remove(condominium);
            await _context.SaveChangesAsync();
        }

        private Entities.Condominiums getCondominium(int id)
        {
            var condominium = _context.Condominiums.Find(id);
            if (condominium == null)
            {
                throw new KeyNotFoundException("Condominium not found");
            }
            return condominium;
        }
    }
}
