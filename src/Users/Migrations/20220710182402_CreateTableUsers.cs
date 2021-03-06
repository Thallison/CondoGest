using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Migrations
{
    public partial class CreateTableUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", nullable: false),
                    Role = table.Column<string>(type: "varchar(255)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Cpf = table.Column<int>(type: "varchar(11)", nullable: false),
                    Rg = table.Column<string>(type: "varchar(10)", nullable: true),
                    DispatchingAgency = table.Column<string>(type: "varchar(10)", nullable: true),
                    IssueDate = table.Column<DateTime>(type: "date", nullable: true),
                    Apartment = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { 
                    "Id", 
                    "Name", 
                    "Email", 
                    "Password", 
                    "Role", 
                    "Status", 
                    "Cpf", 
                    "Rg", 
                    "DispatchingAgency", 
                    "IssueDate", 
                    "Apartment", 
                    "CreatedAt", 
                    "UpdatedAt" 
                },
                values: new object[] { 
                    1L,
                    "Admin",
                    "teste@gmail.com",
                    "$2a$10$K1wlBMyz/p6bsWhg2aZl8e2vmimvnZCReRX/GFSFJ5cOFV6KYT96K",
                    "Administrador",
                    1,
                    "12345678912",
                    "123456",
                    "SSP",
                    null,
                    "102",
                    new DateTime(2022, 5, 09, 12, 0, 0, 0, DateTimeKind.Local),
                    null
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
