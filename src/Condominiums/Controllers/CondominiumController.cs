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
            var users = _condominiumService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _condominiumService.GetById(id);
            return Ok(user);
        }
    }
}