using System;

namespace SIS.API.Dtos {
    public class UserFilesForDetailedDto {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isThesis { get; set; }
        public bool isProject { get; set; }
        public string FileName { get; set; }
    }
}