using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Front_Endeavor.Models
{
    public class Workspace
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string GithubRepo { get; set; }
        [AllowNull]
        public string DataRelatDiagram { get; set; }
        [AllowNull]
        public string MockupDiagram { get; set; }
        [AllowNull]
        public string Color1 { get; set; }
        [AllowNull]
        public string Color2 { get; set; }
        [AllowNull]
        public string Color3 { get; set; }
    }
}
