using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Condominiums.Migrations
{
    public partial class CondominiumsCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase();

            migrationBuilder.CreateTable(
                name: "Condominiums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    CorporateName = table.Column<string>(type: "varchar(255)", nullable: false),
                    Address = table.Column<string>(type: "varchar(255)", nullable: false),
                    Number = table.Column<string>(type: "varchar(45)", nullable: false),
                    District = table.Column<string>(type: "varchar(255)", nullable: false),
                    City = table.Column<string>(type: "varchar(255)", nullable: false),
                    State = table.Column<string>(type: "varchar(255)", nullable: false),
                    PostalCode = table.Column<string>(type: "varchar(8)", nullable: false),
                    Cnpj = table.Column<string>(type: "varchar(14)", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Condominiums", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Condominiums",
                columns: new[] { 
                    "Id",
                    "Name", 
                    "CorporateName", 
                    "Address", 
                    "Number", 
                    "District", 
                    "City", 
                    "State", 
                    "PostalCode", 
                    "Cnpj", 
                    "Email", 
                    "Status",
                    "CreatedAt", 
                    "UpdatedAt" 
                },
                values: new object[] { 
                    1L,
                    "Condominio Admin",
                    "Condominio Admin Corporate",
                    "Rua Admin",
                    "123",
                    "Centro",
                    "Belo Horizonte",
                    "MG",
                    "32050222",
                    "16594596000135",
                    "condominioadmin@gmail.com",
                    "1",
                    new DateTime(2022, 5, 09, 12, 0, 0, 0, DateTimeKind.Local),
                    null
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Condominiums");
        }
    }
}
