using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models
{
    public class UserWorkspace
    {
        public int Id { get; set; }
        public int WorkspaceId { get; set; }
        public Workspace Workspace { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public bool DevLead { get; set; }
    }
}
