using System.Text.Json.Serialization;

namespace User.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public string Role { get; set; }
        public int Status { get; set; }
        public string Cpf { get; set; }
        public string? Rg { get; set; }
        public string? DispatchingAgency { get; set; }
        public DateTime? IssueDate { get; set; }
        public int Apartment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
