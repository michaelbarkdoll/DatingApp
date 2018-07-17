using System;

namespace SIS.API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; } 
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isMain { get; set; }
        public string PublicId { get; set; }
    }
}