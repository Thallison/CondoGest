﻿using System.ComponentModel.DataAnnotations;
using Bff.Helpers;
using Bff.Helpers.Enums;

namespace Bff.Dtos.Account
{
    public class RegisterRequest
    {        
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
                _price = Utils.CleanPrice(value);
            }
        }
        
        [Required]
        public DateTime DueDate { get; set; }
        
        public DateTime? PayDay { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public AccountStatus Status { get; set; }
        
        public string? Observation { get; set; }
    }
}
