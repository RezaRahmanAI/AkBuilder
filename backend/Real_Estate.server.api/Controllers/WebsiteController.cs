using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Real_Estate.server.api.Data;

namespace Real_Estate.server.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public WebsiteController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("getblogs")]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await context.Blogs
                .AsNoTracking()
                .Include(blog => blog.User)
                .Where(blog => blog.IsActive)
                .OrderByDescending(blog => blog.PostedDate ?? blog.CreatedDate)
                .Select(blog => new
                {
                    id = blog.Id,
                    title = blog.Title,
                    description = blog.Description,
                    image = blog.Image,
                    postedDate = blog.PostedDate,
                    offerDate = blog.OfferDateTime,
                    name = blog.User != null ? blog.User.FullName : null,
                    picture = blog.User != null ? blog.User.Picture : null
                })
                .ToListAsync();

            return Ok(blogs);
        }

        [HttpGet("getsingleblog")]
        public async Task<IActionResult> GetSingleBlog([FromQuery] string blogId)
        {
            if (string.IsNullOrWhiteSpace(blogId))
            {
                return BadRequest("Blog ID is required.");
            }

            var blog = await context.Blogs
                .AsNoTracking()
                .Include(item => item.User)
                .Where(item => item.IsActive && item.Id == blogId)
                .Select(item => new
                {
                    id = item.Id,
                    title = item.Title,
                    description = item.Description,
                    image = item.Image,
                    postedDate = item.PostedDate,
                    offerDate = item.OfferDateTime,
                    name = item.User != null ? item.User.FullName : null,
                    picture = item.User != null ? item.User.Picture : null
                })
                .FirstOrDefaultAsync();

            if (blog == null)
            {
                return NotFound();
            }

            return Ok(blog);
        }
    }
}
