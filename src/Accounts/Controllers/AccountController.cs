using Microsoft.AspNetCore.Mvc;
using Accounts.Dtos.Account;
using Accounts.Services.Interfaces;

namespace Accounts.Controllers
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
            await _accountService.Create(model);
            return Ok(new { message = "Registration successful" });
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            await _accountService.Update(id, model);
            return Ok(new { message = "Account updated successfully" });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var account = _accountService.GetAll();
            return Ok(account);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var account = _accountService.GetById(id);
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _accountService.Delete(id);
            return Ok(new { message = "Account deleted successfully" });
        }
    }
}