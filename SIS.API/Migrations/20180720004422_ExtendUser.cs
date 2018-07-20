using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SIS.API.Migrations
{
    public partial class ExtendUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DissertationDefenseDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DissertationTitle",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateAdvisor",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DoctorateCandidateAcceptDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember1",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember2",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember3",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember4",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember5",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorateCommitteeMember6",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DoctorateGraduationDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DoctorateStartDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "MasterCommitteeMember1",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MasterCommitteeMember2",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MasterCommitteeMember3",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "MasterDefenseDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "MasterGraduationDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "MasterStartDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "MasterThesisTitle",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeniorProjectTitle",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeniorProjectURL",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DissertationDefenseDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DissertationTitle",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateAdvisor",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCandidateAcceptDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember3",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember4",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember5",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateCommitteeMember6",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateGraduationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DoctorateStartDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterCommitteeMember1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterCommitteeMember2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterCommitteeMember3",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterDefenseDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterGraduationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterStartDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MasterThesisTitle",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SeniorProjectTitle",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SeniorProjectURL",
                table: "Users");
        }
    }
}
