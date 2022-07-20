using Microsoft.AspNetCore.Mvc;
using Condominiums.Helpers.Enums;
using Condominiums.Dtos.Condominium;
using Condominiums.Services.Interfaces;

namespace Condominiums.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CondominiumController : ControllerBase
    {
        private readonly ILogger<CondominiumController> _logger;
        private ICondominiumService _condominiumService;

        public CondominiumController(ILogger<CondominiumController> logger, ICondominiumService condominiumService)
        {
            _logger = logger;
            _condominiumService = condominiumService;
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
        public IActionResult GetAll()
        {
            var account = _condominiumService.GetAll();
            return Ok(account);
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