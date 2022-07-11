using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Users
{
    public class RegisterRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
