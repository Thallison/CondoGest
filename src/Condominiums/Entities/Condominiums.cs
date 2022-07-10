using System.Text.Json.Serialization;

namespace Condominiums.Entities
{
    public class Condominiums
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CorporateName { get; set; }
        public string Address { get; set; }
        public string Number { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Cnpj { get; set; }
        public string Email { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
