using Microsoft.AspNetCore.Mvc;
using Users.Authorization;
using Users.Dtos.Users;
using Users.Services.Interfaces;
using Users.Dtos.Authenticate;
using Users.Helpers.Constants;

namespace Users.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private IUserService _userService;

        public UsersController(IUserService userService, ILogger<UsersController> logger) 
        {
            _userService = userService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterRequest model)
        {
            var user = (Entities.User)HttpContext.Items["User"];
            if(user == null)
            {
                throw new Exception("User not found");
            }
            
            if(model.CondominiumsId == null)
            {
                model.CondominiumsId = user.CondominiumsId;
            }

            await _userService.Create(model);
            return Ok(new { message = "Registration successful" });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<Entities.User> users;
            
            var user = (Entities.User)HttpContext.Items["User"];
            if(user == null)
            {
                throw new Exception("User not found");
            }
            
            if(user.Role == UserRoles.Admin )
            {
                users = _userService.GetAll();
            }
            else if(user.Role == UserRoles.Restrict || user.Role == UserRoles.Public)
            {
                users = _userService.GetUsersById(user.Id);
            }
            else
            {
                users = _userService.GetUsersByCondominium(user.CondominiumsId);
            }
            
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            await _userService.Update(id, model);
            return Ok(new { message = "User updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }
    }
}
