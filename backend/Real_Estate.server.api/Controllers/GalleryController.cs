using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Real_Estate.server.api.Data;
using Real_Estate.server.api.Models;
using System.Diagnostics;

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
        public async Task<IActionResult> GetAll()
        {
            var model = await context.Galleries.AsNoTracking().OrderBy(e => e.Order).ToListAsync();
            return Ok(model);
        }

        [HttpGet]
        [Route("active")]
        public async Task<IActionResult> GetAllActive()
        {
            var model = await context.Galleries.Where(t => t.IsActive).OrderBy(e => e.Order).ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(GalleryModel model)
        {
            var newModel = new Gallery
            {
                Id = Guid.CreateVersion7().ToString(),
                Title = model.title,
                Category = model.category,
                Location = model.location,
                Order = model.order,
                IsActive = true
            };

            if (model.image != null && model.image.Length > 0)
            {
                var extension = Path.GetExtension(model.image.FileName);
                var fileName = DateTime.UtcNow.ToString("ddMMyyyHHmmssffffff") + extension;
                string rootpath = webHostEnvironment.ContentRootPath;
                string fileUploadRoot = Path.Combine(rootpath, "assets", "images");
                Directory.CreateDirectory(fileUploadRoot);
                Debug.WriteLine(fileUploadRoot);
                using (var stream = new FileStream(Path.Combine(fileUploadRoot, fileName), FileMode.Create))
                {
                    await model.image.CopyToAsync(stream);
                }
                newModel.Image = fileName;
            }

            await context.Galleries.AddAsync(newModel);
            await context.SaveChangesAsync();
            return Ok("Item has been created.");
        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> Edit(GalleryModel model)
        {
            var exModel = await context.Galleries.Where(e => e.Id == model.id).FirstOrDefaultAsync();
            if (exModel != null)
            {
                exModel.Title = model.title;
                exModel.Category = model.category;
                exModel.Location = model.location;
                exModel.Order = model.order;

                if (model.image != null && model.image.Length > 0)
                {
                    var extension = Path.GetExtension(model.image.FileName);
                    var fileName = DateTime.UtcNow.ToString("ddMMyyyHHmmssffffff") + extension;
                    string rootpath = webHostEnvironment.ContentRootPath;
                    string fileUploadRoot = Path.Combine(rootpath, "assets", "images");
                    Directory.CreateDirectory(fileUploadRoot);
                    Debug.WriteLine(fileUploadRoot);
                    using (var stream = new FileStream(Path.Combine(fileUploadRoot, fileName), FileMode.Create))
                    {
                        await model.image.CopyToAsync(stream);
                    }
                    exModel.Image = fileName;
                }

                context.Entry(exModel).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return Ok("Item has been updated.");
            }

            return Ok("Data not found.");
        }

        [HttpPost]
        [Route("itemactiveinactive")]
        public async Task<IActionResult> ItemActiveInactive(string id, bool value)
        {
            var data = await context.Galleries.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (data == null) return Ok("Data not found.");
            data.IsActive = value;
            context.Entry(data).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok("Item has been updated.");
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete(string? id)
        {
            var data = await context.Galleries.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (data == null) return Ok("Data not found.");
            context.Galleries.Remove(data);
            await context.SaveChangesAsync();
            return Ok("Item has been deleted.");
        }
    }

    public class GalleryModel
    {
        public string? id { get; set; }
        public string? title { get; set; }
        public string? category { get; set; }
        public string? location { get; set; }
        public IFormFile? image { get; set; }
        public int order { get; set; }
    }
}
