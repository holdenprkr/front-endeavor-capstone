using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models.ViewModels
{
    public class PostResponseViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [AllowNull]
        public string ImageFile { get; set; }
        [AllowNull]
        public string Link { get; set; }
        public string ApplicationUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int WorkspaceId { get; set; }
        public DateTime Timestamp { get; set; }
        public bool Pinned { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }
        public string Color3 { get; set; }
    }
}
