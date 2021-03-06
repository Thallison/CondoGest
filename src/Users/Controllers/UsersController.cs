using Microsoft.AspNetCore.Mvc;
using Users.Authorization;
using Users.Dtos.Users;
using Users.Services.Interfaces;
using Users.Dtos.Authenticate;

namespace Users.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService) 
        {
            _userService = userService;
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
            await _userService.Create(model);
            return Ok(new { message = "Registration successful" });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
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
