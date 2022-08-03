using System.ComponentModel.DataAnnotations;
using Bff.Helpers.Enums;
using Bff.Helpers;

namespace Bff.Dtos.Account
{
    public class AccountResponse
    {
        [Required]
        public int CondominiumsId { get; set; }
        
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
        
        [Required]
        public string Observation { get; set; }
    }
}
