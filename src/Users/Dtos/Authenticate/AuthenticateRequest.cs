using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Authenticate
{
    public class AuthenticateRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
