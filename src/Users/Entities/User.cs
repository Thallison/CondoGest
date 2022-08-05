using System.Text.Json.Serialization;
using Users.Helpers.Enums;

namespace Users.Entities
{
    public class User
    {
        public int Id { get; set; }
        public int CondominiumsId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public string Role { get; set; }
        public UserStatus Status { get; set; }
        public string Cpf { get; set; }
        public string? Rg { get; set; }
        public string? DispatchingAgency { get; set; }
        public DateTime? IssueDate { get; set; }
        public int Apartment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
