using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatingApp.API.Migrations
{
    public partial class ExtendUserClassBachelors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address1",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address2",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Advisor",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DawgTag",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber1",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber2",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserLevel",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UsersBachelorDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FacultyMentor = table.Column<string>(nullable: true),
                    SeniorProjectAdvisor = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersBachelorDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersBachelorDetails_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersBachelorDetails_UserId",
                table: "UsersBachelorDetails",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersBachelorDetails");

            migrationBuilder.DropColumn(
                name: "Address1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Address2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Advisor",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DawgTag",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserLevel",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Users");
        }
    }
}
