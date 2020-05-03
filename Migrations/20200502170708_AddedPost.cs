using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Front_Endeavor.Migrations
{
    public partial class AddedPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2a49a840-e3ff-45fb-84b1-345717c60c35", "AQAAAAEAACcQAAAAEPpvsihY6hn+MrQqDa0JrZI8rKYTGclenXQZxxdT3g4pXZG/fb0oWsZv9xppCWq/fA==" });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "ApplicationUserId", "ImageFile", "Link", "Pinned", "Text", "Timestamp", "WorkspaceId" },
                values: new object[] { 1, "00000000-ffff-ffff-ffff-ffffffffffff", null, null, false, "Wow! It works!", new DateTime(2020, 5, 2, 12, 7, 8, 403, DateTimeKind.Local).AddTicks(5052), 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Post",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "8dd9ae59-7e74-4b35-8a93-01fc07eb20c5", "AQAAAAEAACcQAAAAEIx+vnW614dIlWtX3Io0UfgQpiNHe+N/HoA/yq1jXqrCzktICATD4bndIU3f+WdTJQ==" });
        }
    }
}
