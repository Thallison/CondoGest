using Microsoft.AspNetCore.Mvc;
using Bff.Dtos.Authenticate;
using Bff.Dtos.Users;
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
            var result = await _userService.Login(model);   
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var users = await _userService.GetAll(token);
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var users = await _userService.GetById(token, id);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterRequest model)
        {
            model.Password = model.Cpf;
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var response = await _userService.Create(token, model);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var response = await _userService.Update(token, id, model);
            return Ok(response);
        }
    }
}