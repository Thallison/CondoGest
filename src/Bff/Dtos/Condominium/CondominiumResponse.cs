using System.ComponentModel.DataAnnotations;
using Bff.Helpers.Enums;
using Bff.Helpers;

namespace Bff.Dtos.Condominium
{
    public class CondominiumResponse
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string CorporateName { get; set; }
        
        [Required]
        public string Address { get; set; }
        
        [Required]
        public string Number { get; set; }

        [Required]
        public string District { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string Cnpj { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Email in invalid format.")]
        public string Email { get; set; }

        [Required]
        public CondominiumStatus Status { get; set; }
    }
}
