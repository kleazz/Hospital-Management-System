using LMS.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LMS.Dto
{
    public class RezervimiDto
    {
        [Key]
        public int RezervimiId { get; set; }

        public string Username { get; set; }
        public DateTime DueDate { get; set; }

        public string Isbn { get; set; }
     
        public string Id { get; set; }
      
    }
}
