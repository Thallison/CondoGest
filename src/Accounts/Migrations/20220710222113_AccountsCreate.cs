using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Accounts.Migrations
{
    public partial class AccountsCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase();

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CondominiumsId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    PayDay = table.Column<DateTime>(type: "datetime", nullable: true),
                    Description = table.Column<string>(type: "mediumtext", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Observation = table.Column<string>(type: "mediumtext", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_Condominiums",
                        column: x => x.CondominiumsId,
                        principalTable: "Condominiums",
                        principalColumn: "Id",
                        onUpdate: ReferentialAction.Cascade,
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "FK_Accounts_Condominiums_Idx",
                table: "Accounts",
                column: "CondominiumsId"
            );

             migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { 
                    "Id",
                    "CondominiumsId", 
                    "Name", 
                    "Price", 
                    "DueDate", 
                    "PayDay", 
                    "Description", 
                    "Status", 
                    "Observation", 
                    "CreatedAt", 
                    "UpdatedAt" 
                },
                values: new object[] { 
                    1L,
                    1,
                    "Conta Condominio Admin",
                    "100",
                    new DateTime(2022, 5, 09, 12, 0, 0, 0, DateTimeKind.Local),
                    new DateTime(2022, 6, 09, 12, 0, 0, 0, DateTimeKind.Local),
                    "Conta teste",
                    "1",
                    null,
                    new DateTime(2022, 5, 09, 12, 0, 0, 0, DateTimeKind.Local),
                    null
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
