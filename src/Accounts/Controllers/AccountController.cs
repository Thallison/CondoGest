using Microsoft.AspNetCore.Mvc;
using Accounts.Dtos.Account;
using Accounts.Services.Interfaces;
using Accounts.Helpers.Constants;
using Accounts.Entities;
namespace Accounts.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private IAccountService _accountService;
        private IUserService _userService;

        public AccountController(ILogger<AccountController> logger, IAccountService accountService, IUserService userService)
        {
            _logger = logger;
            _accountService = accountService;
            _userService = userService;
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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                IEnumerable<Entities.Accounts> accounts;

                var token = this.HttpContext.Request.Headers["Authorization"].ToString();
                var userId = (int)HttpContext.Items["userId"];
                var user = await _userService.GetById(token, userId);
                
                if (user.Role == UserRoles.Admin)
                {
                    accounts = _accountService.GetAll();
                }
                else
                {
                    accounts = _accountService.GetAccountByCondominium(user.CondominiumsId);
                }

                return Ok(accounts);
            }
            catch (System.Exception)
            {
                return StatusCode(500, "Error message");
            }
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