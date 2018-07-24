using System;
using Microsoft.AspNetCore.Http;

namespace SIS.API.Dtos
{
    public class UserFilesForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public UserFilesForCreationDto()
        {
            DateAdded = DateTime.Now;
            
        }

        public string FilePath { get; set; }
        public bool isThesis { get; set; }
        public bool isProject { get; set; }
    }
}
