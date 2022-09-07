using AutoMapper;
using Users.Authorization;
using Users.Dtos.Authenticate;
using Users.Dtos.Users;
using Users.Helpers;
using Users.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Users.Services
{
    public class UserService : IUserService
    {
        private const int _salt = 10; // 2 ^ (10) = 1024 iterations.
        private ApplicationDbContext _context;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(
            ApplicationDbContext context,
            IJwtUtils jwtUtils,
            IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var userFind = _context.Users.SingleOrDefault(x => x.Email == model.Email);

            // validate
            if (userFind == null || !BCrypt.Net.BCrypt.Verify(model.Password, userFind.Password))
            {
                throw new AppException("Username or password is incorrect");
            }

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(userFind);
            response.Token = _jwtUtils.GenerateToken(userFind);
            return response;
        }

        public IEnumerable<Entities.User> GetAll()
        {
            return _context.Users;
        }

        public IEnumerable<Entities.User> GetUsersByCondominium(int condominiumsId)
        {
            return _context.Users.Where(x => x.CondominiumsId == condominiumsId);
        }
        public IEnumerable<Entities.User> GetUsersById(int id)
        {
            return _context.Users.Where(x => x.Id == id);
        }

        public Entities.User GetById(int id)
        {
            return getUser(id);
        }

        public async Task Create(RegisterRequest model)
        {
            // validate
            if (_context.Users.Any(x => x.Email == model.Email))
            {
                throw new AppException("Email '" + model.Email + "' is already taken");
            }

            // map model to new user object
            var newUser = _mapper.Map<Entities.User>(model);

            // hash password
            newUser.Password = hashGeneration(model.Password);
            newUser.CreatedAt = DateTime.Now;

            // save user
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, UpdateRequest model)
        {
            var UpdateUser = getUser(id);

            // validate
            /*if (model.Email != UpdateUser.Email && _context.Users.Any(x => x.Email == model.Email))
                throw new AppException("Email '" + model.Email + "' is already taken");*/

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
            {
                UpdateUser.Password = hashGeneration(model.Password);
            }

            UpdateUser.UpdatedAt = DateTime.Now;

            // copy model to user and save
            _mapper.Map(model, UpdateUser);
            _context.Users.Update(UpdateUser);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        private Entities.User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return user;
        }

        private static string hashGeneration(string password)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(_salt);
            string hash = BCrypt.Net.BCrypt.HashPassword(password, salt);
            return hash;
        }
    }
}
