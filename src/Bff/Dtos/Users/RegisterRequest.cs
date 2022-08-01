﻿using System.ComponentModel.DataAnnotations;
using Bff.Helpers.Enums;

namespace Bff.Dtos.Users
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Email in invalid format.")]
        public string Email { get; set; }

        public string? Password { get; set; }
        
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
