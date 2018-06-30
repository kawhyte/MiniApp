using System.Collections.Generic;
using System.Collections.ObjectModel;
using DTG.API.Models;

namespace DTG.API.Dtos
{
    public class MakeDto
    {
          public int Id { get; set;} 
       // [Required]
       // [StringLength(255)]
        public string Name { get; set; }
        public ICollection <ModelDto> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<ModelDto>();
        }
    }
}