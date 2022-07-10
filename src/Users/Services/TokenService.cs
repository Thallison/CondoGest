
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using User.Entities;
using User.Services.Interfaces;

namespace User.Services
{
    public class TokenService : ITokenService
    {
        public async Task<string> GerarTokenJwt(Entities.User usuario, IConfiguration config)
        {
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];
            var expiry = DateTime.Now.AddMinutes(120);

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, usuario.Name),
                new Claim(ClaimTypes.Role, usuario.Role)
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Issuer = issuer,
                Audience = audience,
                Expires = expiry,
                SigningCredentials = credentials
                
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);
            
            return stringToken;
        }
    }
}
