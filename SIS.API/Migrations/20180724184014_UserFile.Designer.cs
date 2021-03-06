﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SIS.API.Data;
using System;

namespace SIS.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20180724184014_UserFile")]
    partial class UserFile
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026");

            modelBuilder.Entity("SIS.API.Models.AdvisorDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<string>("FullName");

                    b.Property<string>("LastName");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("UserAdvisorDetails");
                });

            modelBuilder.Entity("SIS.API.Models.Advisors", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<string>("FullName");

                    b.Property<string>("LastName");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Advisors");
                });

            modelBuilder.Entity("SIS.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<string>("FilePath");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.Property<int>("UserId");

                    b.Property<bool>("isMain");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("SIS.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address1");

                    b.Property<string>("Address2");

                    b.Property<string>("Advisor");

                    b.Property<string>("BachelorFacultyMentor");

                    b.Property<DateTime?>("BachelorGraduationDate");

                    b.Property<DateTime?>("BachelorStartDate");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<int>("DawgTag");

                    b.Property<DateTime?>("DissertationDefenseDate");

                    b.Property<string>("DissertationTitle");

                    b.Property<string>("DoctorateAdvisor");

                    b.Property<DateTime?>("DoctorateCandidateAcceptDate");

                    b.Property<string>("DoctorateCommitteeMember1");

                    b.Property<string>("DoctorateCommitteeMember2");

                    b.Property<string>("DoctorateCommitteeMember3");

                    b.Property<string>("DoctorateCommitteeMember4");

                    b.Property<string>("DoctorateCommitteeMember5");

                    b.Property<string>("DoctorateCommitteeMember6");

                    b.Property<DateTime?>("DoctorateGraduationDate");

                    b.Property<DateTime?>("DoctorateStartDate");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<string>("Interests");

                    b.Property<string>("Introduction");

                    b.Property<string>("KnownAs");

                    b.Property<DateTime>("LastActive");

                    b.Property<string>("LastName");

                    b.Property<string>("LookingFor");

                    b.Property<string>("MasterAdvisor");

                    b.Property<string>("MasterCommitteeMember1");

                    b.Property<string>("MasterCommitteeMember2");

                    b.Property<string>("MasterCommitteeMember3");

                    b.Property<DateTime?>("MasterDefenseDate");

                    b.Property<string>("MasterFocus");

                    b.Property<DateTime?>("MasterGraduationDate");

                    b.Property<string>("MasterProjectTitle");

                    b.Property<DateTime?>("MasterStartDate");

                    b.Property<string>("MasterThesisTitle");

                    b.Property<string>("Notes");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhoneNumber1");

                    b.Property<string>("PhoneNumber2");

                    b.Property<string>("SeniorProjectAdvisor");

                    b.Property<string>("SeniorProjectTitle");

                    b.Property<string>("SeniorProjectURL");

                    b.Property<string>("State");

                    b.Property<string>("StudentLevel");

                    b.Property<string>("UserLevel");

                    b.Property<string>("Username");

                    b.Property<string>("ZipCode");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SIS.API.Models.UserFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<string>("FileName");

                    b.Property<string>("FilePath");

                    b.Property<string>("Url");

                    b.Property<int>("UserId");

                    b.Property<bool>("isProject");

                    b.Property<bool>("isThesis");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserFiles");
                });

            modelBuilder.Entity("SIS.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("SIS.API.Models.AdvisorDetails", b =>
                {
                    b.HasOne("SIS.API.Models.User", "User")
                        .WithOne("AdvisorDetails")
                        .HasForeignKey("SIS.API.Models.AdvisorDetails", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SIS.API.Models.Photo", b =>
                {
                    b.HasOne("SIS.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SIS.API.Models.UserFile", b =>
                {
                    b.HasOne("SIS.API.Models.User", "User")
                        .WithMany("UserFiles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
