namespace Real_Estate.server.api.Models
{
    public class Gallery
    {
        public string Id { get; set; } = Guid.CreateVersion7().ToString();
        public string? Image { get; set; }
        public string? Type { get; set; }
        public bool IsActive { get; set; }
        public int Order { get; set; }
    }
}
