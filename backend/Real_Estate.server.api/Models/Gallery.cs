using System.ComponentModel.DataAnnotations;

namespace Real_Estate.server.api.Models
{
    public class Gallery
    {
        [Key]
        public string Img { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
