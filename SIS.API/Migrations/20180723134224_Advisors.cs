using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SIS.API.Migrations
{
    public partial class Advisors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MasterAdvisor",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MasterFocus",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MasterProjectTitle",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentLevel",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Advisors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advisors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAdvisorDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAdvisorDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAdvisorDetails_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAdvisorDetails_UserId",
                table: "UserAdvisorDetails",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Advisors");

            migrationBuilder.DropTable(
                name: "UserAdvisorDetails");

            migrationBuilder.DropColumn(
                name: "MasterAdvisor",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterFocus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterProjectTitle",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StudentLevel",
                table: "Users");
        }
    }
}
