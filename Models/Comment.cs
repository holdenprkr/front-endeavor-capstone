using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
