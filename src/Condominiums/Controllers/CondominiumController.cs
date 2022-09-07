using Microsoft.AspNetCore.Mvc;
using Condominiums.Helpers.Enums;
using Condominiums.Dtos.Condominium;
using Condominiums.Services.Interfaces;
using Condominiums.Helpers.Constants;
namespace Condominiums.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CondominiumController : ControllerBase
    {
        private readonly ILogger<CondominiumController> _logger;
        private ICondominiumService _condominiumService;
        private IUserService _userService;

        public CondominiumController(ILogger<CondominiumController> logger, ICondominiumService condominiumService, IUserService userService)
        {
            _logger = logger;
            _condominiumService = condominiumService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterRequest model)
        {
            await _condominiumService.Create(model);
            return Ok(new { message = "Registration successful" });
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            await _condominiumService.Update(id, model);
            return Ok(new { message = "Condominium updated successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Entities.Condominiums> condominium;
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var userId = (int)HttpContext.Items["userId"];
            var user = await _userService.GetById(token, userId);

            if (user.Role == UserRoles.Admin)
            {
                condominium = _condominiumService.GetAll();
            }
            else
            {
                condominium = _condominiumService.GetCondominiumsById(user.CondominiumsId);
            }
            
            return Ok(condominium);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var account = _condominiumService.GetById(id);
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _condominiumService.Delete(id);
            return Ok(new { message = "Condominium deleted successfully" });
        }
    }
}