using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bff.Helpers.Enums;
using Bff.Helpers;
using System.Globalization;


namespace Bff.Dtos.Account
{
    public class AccountResponse
    {
        public string Id { get; set; }
        
        [Required]
        public int CondominiumsId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        private string _price;
        
        [Required]
        public string Price
        {
            get
            {
                return this._price;
            }

            set 
            {
                _price = Utils.FormatPrice(value);
            }
        }
        
        [Required]
        public DateTime DueDate { get; set; }
        
        public DateTime? PayDay { get; set; }
        
        public string Description { get; set; }
        
        [Required]
        public AccountStatus Status { get; set; }
        
        public string Observation { get; set; }
    }
}
