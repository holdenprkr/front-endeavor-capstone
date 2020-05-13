using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models.ViewModels
{
    public class CommentResponseViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int PostId { get; set; }
        public DateTime Timestamp { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }
        public string Color3 { get; set; }
    }
}
