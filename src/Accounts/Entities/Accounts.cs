using Microsoft.EntityFrameworkCore;

namespace Accounts.Entities
{
    public class Accounts
    {
        public int Id { get; set; }
        public int CondominiumsId { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? PayDay { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string? Observation { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
