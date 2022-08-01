using System.ComponentModel.DataAnnotations;
using Bff.Helpers.Enums;
using Bff.Helpers;

namespace Bff.Dtos.Users
{
    public class UpdateRequest
    {
       [Required]
        public string Name { get; set; }
        
        [Required]
        public string Role { get; set; }
        
        [Required]
        public UserStatus Status { get; set; }
        
        private string _cpf;
        
        [Required]
        public string Cpf
        {
            get
            {
                return this._cpf;
            }

            set 
            {
                _cpf = Utils.cleanCpf(value);
            }
        }
        
        public string? Rg { get; set; }
        
        public string? DispatchingAgency { get; set; }
        
        public DateTime? IssueDate { get; set; }
        
        [Required]
        public int Apartment { get; set; }
    }
}
