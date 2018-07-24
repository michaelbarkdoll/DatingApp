using System;

namespace SIS.API.Models
{
    public class UserFile
    {
        public int Id { get; set; }
        public string Url { get; set; } 
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isThesis { get; set; }
        public bool isProject { get; set; }
        /* public string PublicId { get; set; } */
        public User User { get; set; }
        public int UserId { get; set; }
        public string FilePath { get; set; }
    }
}