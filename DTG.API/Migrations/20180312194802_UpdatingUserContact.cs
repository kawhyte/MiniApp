using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DTG.API.Migrations
{
    public partial class UpdatingUserContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
       
            migrationBuilder.AddColumn<string>(
                name: "Cellular",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TelephoneNumber",
                table: "Users",
                nullable: true);

        
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "Cellular",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TelephoneNumber",
                table: "Users");

           
        }
    }
}
