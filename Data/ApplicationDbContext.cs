using System;
using System.Collections.Generic;
using System.Text;
using Front_Endeavor.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Front_Endeavor.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Like> Like { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<UserWorkspace> UserWorkspace { get; set; }
        public DbSet<Workspace> Workspace { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Post>()
                .Property(p => p.Timestamp)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Comment>()
                .Property(c => c.Timestamp)
                .HasDefaultValueSql("GETDATE()");


            ApplicationUser user = new ApplicationUser
            {
                FirstName = "Holden",
                LastName = "Parker",
                UserName = "admin@admin.com",
                NormalizedUserName = "ADMIN@ADMIN.COM",
                Email = "admin@admin.com",
                NormalizedEmail = "ADMIN@ADMIN.COM",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = "7f434309-a4d9-48e9-9ebb-8803db794577",
                Id = "00000000-ffff-ffff-ffff-ffffffffffff"
            };
            var passwordHash = new PasswordHasher<ApplicationUser>();
            user.PasswordHash = passwordHash.HashPassword(user, "Admin8*");
            modelBuilder.Entity<ApplicationUser>().HasData(user);


            modelBuilder.Entity<Workspace>().HasData(
                new Workspace()
                {
                    Id = 1,
                    Name = "FunkyFrontEnd",
                    Description = "The funkiest front-end on the web!",
                    Color1 = "#000000",
                    Color2 = "#000000",
                    Color3 = "#000000"
                }
            );

            modelBuilder.Entity<UserWorkspace>().HasData(
                new UserWorkspace()
                {
                    Id = 1,
                    WorkspaceId = 1,
                    ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                    DevLead = true
                }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post()
                {
                    Id = 1,
                    Text = "Wow! It works!",
                    WorkspaceId = 1,
                    ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                    Timestamp = DateTime.Now,
                    Pinned = false
                }
            );

        }
    }
}
