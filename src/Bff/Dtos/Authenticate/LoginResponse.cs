using System.ComponentModel.DataAnnotations;

namespace Bff.Dtos.Authenticate
{
    public class LoginResponse
    {        
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
