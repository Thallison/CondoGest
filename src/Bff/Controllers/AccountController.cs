using Microsoft.AspNetCore.Mvc;
using Bff.Dtos.Account;
using Bff.Services.Interfaces;

namespace Bff.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private IAccountService _accountService;

        public AccountController(ILogger<AccountController> logger, IAccountService accountService)
        {
            _logger = logger;
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterRequest model)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _accountService.Create(token, model);
            return Ok(result);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _accountService.Update(token, id, model);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var account = await _accountService.GetAll(token);
            return Ok(account);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var account = await _accountService.GetById(token, id);
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _accountService.Delete(token, id);
            return Ok(result);
        }
    }
}