namespace Real_Estate.server.api.Models
{
    public class Gallery
    {
        public string Id { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? Location { get; set; }
        public string? Image { get; set; }
        public bool IsActive { get; set; }
        public int Order { get; set; }
    }
}
