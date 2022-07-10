using User.Entities;

namespace User.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GerarTokenJwt(Entities.User usuario, IConfiguration config);
    }
}
