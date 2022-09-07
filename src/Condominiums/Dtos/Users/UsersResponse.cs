using System.ComponentModel.DataAnnotations;
using Condominiums.Helpers.Enums;
using Condominiums.Helpers;

namespace Condominiums.Dtos.Users
{
    public class UsersResponse
    {
        public string Id { get; set; }
        
        public int CondominiumsId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }
        
        public UserStatus Status { get; set; }

        public string Cpf { get; set; }

        public string? Rg { get; set; }
        
        public string? DispatchingAgency { get; set; }
        
        public DateTime? IssueDate { get; set; }
        
        public int Apartment { get; set; }
    }
}
