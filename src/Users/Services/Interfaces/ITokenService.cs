using Users.Entities;

namespace Users.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GerarTokenJwt(Entities.User usuario, IConfiguration config);
    }
}
