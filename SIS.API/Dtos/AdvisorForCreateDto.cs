using System.ComponentModel.DataAnnotations;

namespace SIS.API.Dtos
{
    public class AdvisorForCreateDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Title { get; set; }
    }
}