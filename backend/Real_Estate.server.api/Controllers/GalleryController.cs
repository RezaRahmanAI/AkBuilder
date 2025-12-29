using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Real_Estate.server.api.Data;
using Real_Estate.server.api.Models;

namespace Real_Estate.server.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IWebHostEnvironment webHostEnvironment;

        public GalleryController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? type)
        {
            var query = context.Galleries.AsNoTracking();
            if (!string.IsNullOrWhiteSpace(type))
            {
                query = query.Where(item => item.Type == type);
            }

            var model = await query.OrderBy(e => e.Order).ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromForm] GalleryCreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.type))
            {
                return BadRequest("Gallery type is required.");
            }

            if (model.images == null || model.images.Count == 0)
            {
                return BadRequest("At least one image is required.");
            }

            string rootpath = webHostEnvironment.ContentRootPath;
            string fileUploadRoot = Path.Combine(rootpath, "assets", "images");
            Directory.CreateDirectory(fileUploadRoot);

            var order = model.order;
            var newModels = new List<Gallery>();
            foreach (var file in model.images)
            {
                if (file.Length <= 0)
                {
                    continue;
                }

                var extension = Path.GetExtension(file.FileName);
                var fileName = $"{Guid.NewGuid():N}{extension}";
                using (var stream = new FileStream(Path.Combine(fileUploadRoot, fileName), FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                newModels.Add(new Gallery
                {
                    Id = Guid.CreateVersion7().ToString(),
                    Image = fileName,
                    Type = model.type,
                    Order = order,
                    IsActive = true
                });
                order += 1;
            }

            if (newModels.Count == 0)
            {
                return BadRequest("No valid images were provided.");
            }

            await context.Galleries.AddRangeAsync(newModels);
            await context.SaveChangesAsync();
            return Ok("Gallery items have been created.");
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete(string? id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest("Gallery identifier is required.");
            }

            var data = await context.Galleries.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (data == null) return Ok("Data not found.");
            context.Galleries.Remove(data);
            await context.SaveChangesAsync();
            return Ok("Item has been deleted.");
        }
    }

    public class GalleryCreateModel
    {
        public string? type { get; set; }
        public List<IFormFile>? images { get; set; }
        public int order { get; set; }
    }
}
