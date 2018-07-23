using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SIS.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    Advisor = table.Column<string>(nullable: true),
                    BachelorFacultyMentor = table.Column<string>(nullable: true),
                    BachelorGraduationDate = table.Column<DateTime>(nullable: true),
                    BachelorStartDate = table.Column<DateTime>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    DawgTag = table.Column<int>(nullable: false),
                    DissertationDefenseDate = table.Column<DateTime>(nullable: true),
                    DissertationTitle = table.Column<string>(nullable: true),
                    DoctorateAdvisor = table.Column<string>(nullable: true),
                    DoctorateCandidateAcceptDate = table.Column<DateTime>(nullable: true),
                    DoctorateCommitteeMember1 = table.Column<string>(nullable: true),
                    DoctorateCommitteeMember2 = table.Column<string>(nullable: true),
                    DoctorateCommitteeMember3 = table.Column<string>(nullable: true),
                    DoctorateCommitteeMember4 = table.Column<string>(nullable: true),
                    DoctorateCommitteeMember5 = table.Column<string>(nullable: true),
                    DoctorateCommitteeMember6 = table.Column<string>(nullable: true),
                    DoctorateGraduationDate = table.Column<DateTime>(nullable: true),
                    DoctorateStartDate = table.Column<DateTime>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Interests = table.Column<string>(nullable: true),
                    Introduction = table.Column<string>(nullable: true),
                    KnownAs = table.Column<string>(nullable: true),
                    LastActive = table.Column<DateTime>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    LookingFor = table.Column<string>(nullable: true),
                    MasterAdvisor = table.Column<string>(nullable: true),
                    MasterCommitteeMember1 = table.Column<string>(nullable: true),
                    MasterCommitteeMember2 = table.Column<string>(nullable: true),
                    MasterCommitteeMember3 = table.Column<string>(nullable: true),
                    MasterDefenseDate = table.Column<DateTime>(nullable: true),
                    MasterFocus = table.Column<string>(nullable: true),
                    MasterGraduationDate = table.Column<DateTime>(nullable: true),
                    MasterProjectTitle = table.Column<string>(nullable: true),
                    MasterStartDate = table.Column<DateTime>(nullable: true),
                    MasterThesisTitle = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    PhoneNumber1 = table.Column<string>(nullable: true),
                    PhoneNumber2 = table.Column<string>(nullable: true),
                    SeniorProjectAdvisor = table.Column<string>(nullable: true),
                    SeniorProjectTitle = table.Column<string>(nullable: true),
                    SeniorProjectURL = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    StudentLevel = table.Column<string>(nullable: true),
                    UserLevel = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    FilePath = table.Column<string>(nullable: true),
                    PublicId = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    isMain = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Photos_UserId",
                table: "Photos",
                column: "UserId");

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
                name: "Photos");

            migrationBuilder.DropTable(
                name: "UserAdvisorDetails");

            migrationBuilder.DropTable(
                name: "Values");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
