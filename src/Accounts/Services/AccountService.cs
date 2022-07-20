using AutoMapper;
using Accounts.Dtos.Account;
using Accounts.Helpers;
using Accounts.Services.Interfaces;

namespace Accounts.Services
{
    public class AccountService : IAccountService
    {
        private ApplicationDbContext _context;        
        private readonly IMapper _mapper;

        public AccountService(
            ApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Entities.Accounts> GetAll()
        {
            return _context.Accounts;
        }

        public Entities.Accounts GetById(int id)
        {
            return getAccount(id);
        }

        public async Task Create(RegisterRequest model)
        {
            // map model to new user object
            var newAccount = _mapper.Map<Entities.Accounts>(model);
            newAccount.CreatedAt = DateTime.Now;

            // save user
            _context.Accounts.Add(newAccount);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, UpdateRequest model)
        {
            var UpdateAccount = getAccount(id);
            UpdateAccount.UpdatedAt = DateTime.Now;
            
            // copy model to user and save
            _mapper.Map(model, UpdateAccount);
            _context.Accounts.Update(UpdateAccount);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var account = getAccount(id);
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }

        private Entities.Accounts getAccount(int id)
        {
            var account = _context.Accounts.Find(id);
            if (account == null)
            {
                throw new KeyNotFoundException("Account not found");
            }
            return account;
        }
    }
}
