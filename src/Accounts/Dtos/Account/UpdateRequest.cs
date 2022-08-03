using System.ComponentModel.DataAnnotations;
using Accounts.Helpers.Enums;

namespace Accounts.Dtos.Account
{
    public class UpdateRequest
    {        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public Decimal Price { get; set; }
        
        [Required]
        public DateTime DueDate { get; set; }
        
        public DateTime? PayDay { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public AccountStatus Status { get; set; }
        
        public string Observation { get; set; }
    }
}
