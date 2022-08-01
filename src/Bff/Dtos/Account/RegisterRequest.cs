using System.ComponentModel.DataAnnotations;

namespace Bff.Dtos.Account
{
    public class RegisterRequest
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
        public int Status { get; set; }
        
        [Required]
        public string Observation { get; set; }
    }
}
