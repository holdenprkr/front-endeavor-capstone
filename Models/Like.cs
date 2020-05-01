using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models
{
    public class Like
    {
        public int Id { get; set; }
        public string ApplicationUserId  { get; set; }
        public bool UpVote { get; set; }
        public int PostId { get; set; }
    }
}
