using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [AllowNull]
        public string ImageFile { get; set; }
        [AllowNull]
        public string Link { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public int WorkspaceId { get; set; }
        public DateTime Timestamp { get; set; }
        public bool Pinned { get; set; }
    }
}
