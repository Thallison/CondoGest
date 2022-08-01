using Microsoft.AspNetCore.Mvc;
using Bff.Helpers.Enums;
using Bff.Dtos.Condominium;
using Bff.Services.Interfaces;

namespace Bff.Controllers
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
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _condominiumService.Create(token, model);
            return Ok(result);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateRequest model)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var result = await _condominiumService.Update(token, id, model);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var account = await _condominiumService.GetAll(token);
            return Ok(account);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            var account = await _condominiumService.GetById(token, id);
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var token = this.HttpContext.Request.Headers["Authorization"].ToString();
            await _condominiumService.Delete(token, id);
            return Ok(new { message = "Condominium deleted successfully" });
        }
    }
}