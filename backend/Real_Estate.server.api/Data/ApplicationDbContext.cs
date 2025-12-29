using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Real_Estate.server.api.Models;
using Microsoft.EntityFrameworkCore;
using Real_Estate.server.api.Data.EntityConfig;

namespace Real_Estate.server.api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string,
       IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>,
       IdentityRoleClaim<string>, IdentityUserToken<string>>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectFeature> ProjectFeatures { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<Gallery> Galleries { get; set; }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Blog> Blogs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema("dbo");
            builder.ApplyConfiguration(new UserRoleEntityConfig());
            builder.ApplyConfiguration(new ProjectFeatureEntityConfig());
            builder.ApplyConfiguration(new BlogEntityConfig());
        }
    }
}
