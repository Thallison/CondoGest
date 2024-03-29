﻿using System.ComponentModel.DataAnnotations;
using Bff.Helpers.Enums;
using Bff.Helpers;

namespace Bff.Dtos.Condominium
{
    public class CondominiumResponse
    {
        public string Id { get; set; }
        
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

        private string _postalCode;
        
        [Required]
        public string PostalCode
        {
            get
            {
                return this._postalCode;
            }

            set 
            {
                _postalCode = Utils.FormatPostalCode(value);
            }
        }

        private string _cnpj;
        
        [Required]
        public string Cnpj
        {
            get
            {
                return this._cnpj;
            }

            set 
            {
                _cnpj = Utils.FormatCnpj(value);
            }
        }

        [Required]
        [EmailAddress(ErrorMessage = "Email in invalid format.")]
        public string Email { get; set; }

        [Required]
        public CondominiumStatus Status { get; set; }
    }
}
