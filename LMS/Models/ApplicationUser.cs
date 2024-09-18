using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Rezervimi> Rezervimet { get; set; }

        public ICollection<Huazimi> Huazimet { get; set; }

        public ICollection<Review> Reviews { get; set; }
    }
}
