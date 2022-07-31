using Microsoft.AspNetCore.Mvc;
using Bff.Dtos.Authenticate;
using Bff.Authorization;
using Bff.Services.Interfaces;
using Newtonsoft.Json;

namespace Bff.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        private IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<IActionResult> Auth(LoginRequest model)
        {
            //var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _userService.Login(model);
            
            return Ok(result);
        }
    }
}